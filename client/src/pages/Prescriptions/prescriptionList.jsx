import React, { useState, useEffect } from "react";
import { getPrescription, deletePrescription } from "../../api/prescription";
import { getMedicamentById } from "../../api/medicaments";
import { getPharmacieById } from "../../api/pharmacie";
import { useNavigate } from "react-router-dom";

function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPatientDetails = async (patientUrl) => {
    try {
      const response = await fetch(patientUrl);
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error("Erreur lors de la récupération du patient :", error);
      return null;
    }
  };

  const fetchPrescripteurDetails = async (prescripteurUrl) => {
    try {
      const response = await fetch(prescripteurUrl);
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error("Erreur lors de la récupération du prescripteur :", error);
      return null;
    }
  };

  const fetchMedicamentDetails = async (medicamentUrl) => {
    if (!medicamentUrl) {
      console.warn("URL du médicament non définie");
      return null;
    }

    try {
      // Extraire l'ID du médicament
      const medicamentId = medicamentUrl.split("/").pop();
      if (!medicamentId) {
        console.warn("ID du médicament non trouvé dans l'URL:", medicamentUrl);
        return null;
      }

      // Récupérer les détails du médicament
      const medicament = await getMedicamentById(medicamentId);
      console.log("Médicament récupéré:", medicament);

      if (medicament && medicament.medicament) {
        // Extraire l'ID de la pharmacie à partir de med.medicament
        const pharmacieId = medicament.medicament.split("/").pop();
        if (!pharmacieId) {
          console.warn("ID de la pharmacie non trouvé dans l'URL:", medicament.medicament);
          return { ...medicament, pharmacieMedicament: "Inconnu" };
        }

        // Récupérer la pharmacie et son médicament
        const pharmacie = await getPharmacieById(pharmacieId);
        console.log("Pharmacie récupérée:", pharmacie);

        return {
          ...medicament,
          pharmacieMedicament: pharmacie.medicament || "Inconnu", // ✅ Récupération correcte
        };
      }
      return medicament;
    } catch (error) {
      console.error("Erreur lors de la récupération du médicament :", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prescriptionsData = await getPrescription();
        console.log("Prescriptions récupérées:", prescriptionsData);

        const enrichedPrescriptions = await Promise.all(
          prescriptionsData.map(async (prescription) => {
            const patient = await fetchPatientDetails(prescription.patient);
            const prescripteur = await fetchPrescripteurDetails(prescription.prescripteur);

            const medicamentsPrescrits = await Promise.all(
              (prescription.medicamentsPrescrits || []).map(async (medUrl) => {
                if (!medUrl) {
                  console.warn("URL du médicament non définie pour med:", medUrl);
                  return { medicament: null };
                }

                const medicamentData = await fetchMedicamentDetails(medUrl);
                return { medicament: medicamentData };
              })
            );

            return { ...prescription, patient, prescripteur, medicamentsPrescrits };
          })
        );

        setPrescriptions(enrichedPrescriptions);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette prescription ?")) {
      try {
        await deletePrescription(id);
        setPrescriptions(prescriptions.filter((prescription) => prescription.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Inconnue";
    return new Date(dateString).toLocaleString("fr-FR");
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const patientNom = prescription.patient?.nom || "";
    const patientPrenom = prescription.patient?.prenom || "";
    const prescripteurNom = prescription.prescripteur?.nom || "";

    // Récupérer les noms des médicaments
    const medicamentsNoms = prescription.medicamentsPrescrits
      ?.map((med) => med.medicament?.pharmacieMedicament || "")
      .join(" ");

    const searchString = `${patientNom} ${patientPrenom} ${prescripteurNom} ${medicamentsNoms}`.toLowerCase();

    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Liste des Prescriptions</h1>
      <input
        type="text"
        placeholder="Rechercher par patient ou médecin"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Médicaments</th>
              <th>Prescripteur</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>
                  {prescription.patient
                    ? `${prescription.patient.nom} ${prescription.patient.prenom}`
                    : "Inconnu"}
                </td>
                <td>
                  {prescription.medicamentsPrescrits?.length > 0 ? (
                    prescription.medicamentsPrescrits.map((med, index) => (
                      <div key={index}>
                        {med.medicament
                          ? `${med.medicament.pharmacieMedicament || "Inconnu"} - ${med.medicament.dose} - ${med.medicament.frequence}`
                          : "Médicament non disponible"}
                      </div>
                    ))
                  ) : (
                    "Aucun médicament"
                  )}
                </td>
                <td>
                  {prescription.prescripteur
                    ? `${prescription.prescripteur.prenom} ${prescription.prescripteur.nom}`
                    : "Inconnu"}
                </td>

                <td>{formatDate(prescription.date_prescription)}</td>
                <td>
                  <button onClick={() => navigate(`/prescriptions/edit/${prescription.id}`)}>
                    Modifier
                  </button>
                  <button onClick={() => navigate(`/prescriptions/details/${prescription.id}`)}>
                    Détails
                  </button>
                  <button onClick={() => handleDelete(prescription.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PrescriptionList;