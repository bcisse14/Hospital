import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConsultations } from "../../api/consultation";
import { getPatients } from "../../api/patient";
import { getMedecin } from "../../api/medecin";

function ConsultationDetails() {
  const { id } = useParams();
  const [consultation, setConsultation] = useState(null);
  const [patient, setPatient] = useState(null);
  const [medecin, setMedecin] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Récupérer les données de la consultation
        const consultationsData = await getConsultations(id);
        if (consultationsData && consultationsData.length > 0) {
          const consultationItem = consultationsData[0]; // Prendre le premier élément du tableau
          setConsultation(consultationItem);

          // Extraction des IDs des patient et médecin
          const patientId = consultationItem.patient
            ? parseInt(consultationItem.patient.split("/").pop(), 10)
            : null;
          const medecinId = consultationItem.medecin
            ? parseInt(consultationItem.medecin.split("/").pop(), 10)
            : null;

          // Récupérer les informations du patient et du médecin
          if (patientId) {
            const patientData = await getPatients(patientId);
            setPatient(patientData ? patientData[0] : null);
          }

          if (medecinId) {
            const medecinData = await getMedecin(medecinId);
            setMedecin(medecinData ? medecinData[0] : null);
          }
        } else {
          console.error("Aucune consultation trouvée pour cet ID.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!consultation || !patient || !medecin) {
    return <div>Chargement des détails...</div>;
  }

  // Formatage de la date de consultation
  const formattedConsultationDate = new Date(consultation.date_consultation).toLocaleDateString("fr-FR");

  return (
    <div className="consultation-details">
      <h2>Détails de la Consultation</h2>

      <h3>Informations de la Consultation</h3>
      <p><strong>Date :</strong> {formattedConsultationDate}</p>
      <p><strong>Diagnostique :</strong> {consultation.diagnostique || "Non spécifié"}</p>
      <p><strong>Traitement :</strong> {consultation.traitement || "Non spécifié"}</p>

      <h3>Informations du Patient</h3>
      <p><strong>Nom :</strong> {patient ? patient.nom : "Inconnu"}</p>
      <p><strong>Prénom :</strong> {patient ? patient.prenom : "Inconnu"}</p>
      <p><strong>Date de Naissance :</strong> {patient ? new Date(patient.date_naissance).toLocaleDateString("fr-FR") : "Inconnu"}</p>
      <p><strong>Adresse :</strong> {patient ? patient.adresse : "Inconnu"}</p>
      <p><strong>Téléphone :</strong> {patient ? patient.telephone : "Inconnu"}</p>
      <p><strong>Numéro de Sécurité Sociale :</strong> {patient ? patient.num_secu_social : "Inconnu"}</p>
      <p><strong>Sexe :</strong> {patient ? patient.sexe : "Inconnu"}</p>

      <h3>Informations du Médecin</h3>
      <p><strong>Nom :</strong> {medecin ? medecin.nom : "Inconnu"}</p>
      <p><strong>Prénom :</strong> {medecin ? medecin.prenom : "Inconnu"}</p>
      <p><strong>Téléphone :</strong> {medecin ? medecin.telephone : "Inconnu"}</p>
      <p><strong>Email :</strong> {medecin ? medecin.email : "Inconnu"}</p>
      <p><strong>Spécialité :</strong> {medecin ? medecin.specialite : "Inconnue"}</p>
    </div>
  );
}

export default ConsultationDetails;
