import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHospitalisations } from "../../api/hospitalisation";
import { getPatients } from "../../api/patient";

function HospitalisationDetails() {
  const { id } = useParams();
  const [hospitalisation, setHospitalisation] = useState(null);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Récupérer les données de l'hospitalisation
        const hospitalisationData = await getHospitalisations(id);
        console.log("Données de l'hospitalisation récupérées :", hospitalisationData);

        if (hospitalisationData && hospitalisationData.length > 0) {
          const hospitalisationItem = hospitalisationData[0]; // Prendre le premier élément du tableau
          setHospitalisation(hospitalisationItem);

          // Extraction de l'ID du patient à partir de l'URL
          const patientUrl = hospitalisationItem.patient;
          const patientId = patientUrl ? parseInt(patientUrl.split("/").pop(), 10) : null;

          if (patientId) {
            const patientData = await getPatients(patientId);
            setPatient(patientData ? patientData[0] : null);

            console.log("Données du patient :", patientData);
          } else {
            console.error("ID du patient invalide.");
          }
        } else {
          console.error("Aucune hospitalisation trouvée pour cet ID.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!hospitalisation || !patient) {
    return <div>Chargement des détails...</div>;
  }

  // Formatage des dates
  const formattedEntryDate = hospitalisation.date_entree
    ? new Date(hospitalisation.date_entree).toLocaleDateString("fr-FR")
    : "Non spécifiée";
  const formattedExitDate = hospitalisation.date_sortie
    ? new Date(hospitalisation.date_sortie).toLocaleDateString("fr-FR")
    : "Non spécifiée";

  return (
    <div className="hospitalisation-details">
      <h2>Détails de l'Hospitalisation</h2>

      <h3>Informations sur l'Hospitalisation</h3>
      <p><strong>Chambre :</strong> {hospitalisation.chambre}</p>
      <p><strong>Date d'Entrée :</strong> {formattedEntryDate}</p>
      <p><strong>Date de Sortie :</strong> {formattedExitDate}</p>
      <p><strong>Remarques :</strong> {hospitalisation.remarques || "Non spécifié"}</p>

      <h3>Informations du Patient</h3>
      <p><strong>Nom :</strong> {patient ? patient.nom : "Inconnu"}</p>
      <p><strong>Prénom :</strong> {patient ? patient.prenom : "Inconnu"}</p>
      <p><strong>Date de Naissance :</strong> {patient ? new Date(patient.date_naissance).toLocaleDateString("fr-FR") : "Inconnu"}</p>
      <p><strong>Adresse :</strong> {patient ? patient.adresse : "Inconnu"}</p>
      <p><strong>Téléphone :</strong> {patient ? patient.telephone : "Inconnu"}</p>
      <p><strong>Numéro de Sécurité Sociale :</strong> {patient ? patient.num_secu_social : "Inconnu"}</p>
      <p><strong>Sexe :</strong> {patient ? patient.sexe : "Inconnu"}</p>
    </div>
  );
}

export default HospitalisationDetails;
