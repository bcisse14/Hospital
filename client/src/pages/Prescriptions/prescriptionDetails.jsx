import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPrescriptionById, updatePrescription } from "../../api/prescription";
import { getPatientById, getPatients } from "../../api/patient";
import { getMedecinById, getMedecin } from "../../api/medecin";
import { getMedicamentById, createMedicament, updateMedicament, deleteMedicament } from "../../api/medicaments";
import { getPharmacies, getPharmacieById } from "../../api/pharmacie";

function PrescriptionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [prescriptionDetails, setPrescriptionDetails] = useState(null);
  const [medicaments, setMedicaments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const prescription = await getPrescriptionById(id);

      const patientId = prescription.patient.split("/").pop();
      const patient = await getPatientById(patientId);
      const prescripteurId = prescription.prescripteur.split("/").pop();
      const prescripteur = await getMedecinById(prescripteurId);

      const medicamentsData = await Promise.all(
        prescription.medicamentsPrescrits.map(async (medicamentUrl) => {
          const medicamentId = medicamentUrl.split("/").pop();
          const medicamentPrescrit = await getMedicamentById(medicamentId);
          const medicamentDetails = await getPharmacieById(medicamentPrescrit.medicament.split("/").pop());
          return { ...medicamentPrescrit, medicamentNom: medicamentDetails.medicament, description: medicamentDetails.description };
        })
      );

      setPrescriptionDetails({
        ...prescription,
        patient: patient,
        prescripteur: prescripteur,
        medicaments: medicamentsData,
      });

      const [fetchedPatients, fetchedMedecins, fetchedPharmacies] = await Promise.all([
        getPatients(),
        getMedecin(),
        getPharmacies(),
      ]);
      setPatients(fetchedPatients);
      setMedecins(fetchedMedecins);
      setPharmacies(fetchedPharmacies);
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      setError("Une erreur est survenue lors du chargement des données.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updatePrescription(id, {
        patient: prescriptionDetails.patient.id,
        prescripteur: prescriptionDetails.prescripteur.id,
        medicaments: prescriptionDetails.medicaments.map((med) => ({
          medicament: med.medicament,
          dose: med.dose,
          frequence: med.frequence,
        })),
        date_prescription: new Date().toISOString(),
      });
      alert("Prescription mise à jour avec succès !");
      navigate("/prescriptions/list");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la prescription :", error);
      alert("Une erreur est survenue lors de la mise à jour de la prescription.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Détails de la prescription</h1>

      {prescriptionDetails ? (
        <div>
          <div>
            <strong>Patient :</strong> {prescriptionDetails.patient.nom} {prescriptionDetails.patient.prenom}
          </div>
          <div>
            <strong>Date de prescription :</strong> {new Date(prescriptionDetails.date_prescription).toLocaleDateString()}
          </div>
          <div>
            <strong>Prescripteur :</strong> {prescriptionDetails.prescripteur.nom} {prescriptionDetails.prescripteur.prenom}
          </div>

          <h2 className="text-lg font-bold mt-4">Médicaments prescrits</h2>
          {prescriptionDetails.medicaments.length > 0 ? (
            <ul>
              {prescriptionDetails.medicaments.map((med, index) => (
                <li key={index}>
                  <strong>{med.medicamentNom}</strong> - {med.dose} - {med.frequence}
                  <p>{med.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun médicament prescrit.</p>
          )}
        </div>
      ) : (
        <p>Aucune donnée disponible pour cette prescription.</p>
      )}

      <button
        onClick={() => navigate(`/prescriptions/edit/${id}`)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Modifier la prescription
      </button>
    </div>
  );
}

export default PrescriptionDetails;