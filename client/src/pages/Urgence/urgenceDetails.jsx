import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUrgenceById } from "../../api/urgence";
import { getPatients } from "../../api/patient";

function UrgenceDetails() {
  const { id } = useParams();
  const [urgence, setUrgence] = useState(null);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const urgenceData = await getUrgenceById(id);
        console.log("Données de l'urgence :", urgenceData);
        if (urgenceData) {
          setUrgence(urgenceData);

          // Extraire l'ID du patient
          const patientUrl = urgenceData.patient;
          const patientId = patientUrl
            ? parseInt(patientUrl.split("/").pop(), 10)
            : null;

          if (patientId) {
            const patientData = await getPatients(patientId);
            console.log("Données du patient :", patientData);
            setPatient(patientData ? patientData[0] : null);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'urgence :", error);
      }
    };

    fetchDetails();
  }, [id]);

  const formatDateTime = (isoString) => {
    if (!isoString) return "Non spécifiée";
    const date = new Date(isoString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleDateString("fr-FR", options).replace(",", " à");
  };

  const formatStatut = (statut) => {
    switch (statut) {
      case "en_attente":
        return "En attente";
      case "en_cours":
        return "En cours";
      case "terminé":
        return "Terminé";
      default:
        return "Non spécifié";
    }
  };

  if (!urgence || !patient) {
    return <p>Chargement des détails...</p>;
  }

  return (
    <div className="urgence-details">
      <h2>Détails de l'Urgence</h2>

      <h3>Informations de l'Urgence</h3>
      <p><strong>Heure d'Arrivée :</strong> {formatDateTime(urgence.heureArrivee)}</p>
      <p><strong>Étape Actuelle :</strong> {urgence.etapeActuelle || "Non spécifiée"}</p>
      <p><strong>Étape Suivante :</strong> {urgence.etapeSuivante || "Non spécifiée"}</p>
      <p><strong>Statut :</strong> {formatStatut(urgence.statut)}</p>
      <p><strong>Heure de Sortie :</strong> {formatDateTime(urgence.heureSortie)}</p>

      <h3>Informations du Patient</h3>
      <p><strong>Nom :</strong> {patient.nom || "Inconnu"}</p>
      <p><strong>Prénom :</strong> {patient.prenom || "Inconnu"}</p>
      <p><strong>Date de Naissance :</strong> {patient.date_naissance
        ? new Date(patient.date_naissance).toLocaleDateString("fr-FR")
        : "Non spécifiée"}
      </p>
      <p><strong>Adresse :</strong> {patient.adresse || "Non spécifiée"}</p>
      <p><strong>Téléphone :</strong> {patient.telephone || "Non spécifié"}</p>
      <p><strong>Numéro de Sécurité Sociale :</strong> {patient.num_secu_social || "Non spécifié"}</p>
      <p><strong>Sexe :</strong> {patient.sexe || "Non spécifié"}</p>

      <Link to={`/urgence/edit/${id}`}>Modifier l'Urgence</Link>
    </div>
  );
}

export default UrgenceDetails;
