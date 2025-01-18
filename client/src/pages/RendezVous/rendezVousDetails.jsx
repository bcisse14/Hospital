import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRendezvous } from "../../api/rendezVous";
import { getPatients } from "../../api/patient";
import { getMedecin } from "../../api/medecin";

function RendezVousDetails() {
  const { id } = useParams();
  const [rendezVous, setRendezVous] = useState(null);
  const [patient, setPatient] = useState(null);
  const [medecin, setMedecin] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Récupérer les données du rendez-vous
        const rendezVousData = await getRendezvous(id);
        console.log("Données du rendez-vous récupérées :", rendezVousData); // Log des données du rendez-vous

        if (rendezVousData && rendezVousData.length > 0) {
          const rendezVousItem = rendezVousData[0]; // Prendre le premier élément du tableau
          setRendezVous(rendezVousItem);

          // Extraction des IDs de patient et médecin à partir des URLs
          const patientUrl = rendezVousItem.patient;
          const medecinUrl = rendezVousItem.medecin;

          const patientId = patientUrl ? parseInt(patientUrl.split("/").pop(), 10) : null;
          const medecinId = medecinUrl ? parseInt(medecinUrl.split("/").pop(), 10) : null;

          // Si les IDs sont valides, récupérer les données du patient et du médecin
          if (patientId && medecinId) {
            const [patientData, medecinData] = await Promise.all([
              getPatients(patientId),
              getMedecin(medecinId),
            ]);

            // Si plusieurs patients ou médecins sont retournés, prendre le premier élément du tableau
            setPatient(patientData ? patientData[0] : null);
            setMedecin(medecinData ? medecinData[0] : null);

            console.log("Données du patient :", patientData); // Log des données du patient
            console.log("Données du médecin :", medecinData); // Log des données du médecin
          } else {
            console.error("ID du patient ou du médecin invalide.");
          }
        } else {
          console.error("Aucun rendez-vous trouvé pour cet ID.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!rendezVous || !patient || !medecin) {
    return <div>Chargement des détails...</div>;
  }

  // Formatage de la date et de l'heure
  let formattedDate = "Date non spécifiée";
  let formattedTime = "Heure non spécifiée";

  if (rendezVous.dateRendezvous) {
    const date = new Date(rendezVous.dateRendezvous);

    if (!isNaN(date.getTime())) {
      formattedDate = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      formattedTime = date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  return (
    <div className="rendezvous-details">
      <h2>Détails du Rendez-vous</h2>
      <p><strong>Date :</strong> {formattedDate}</p>
      <p><strong>Heure :</strong> {formattedTime}</p>
      <p><strong>Statut :</strong> {rendezVous.statut}</p>
      
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
      <p><strong>Spécialité :</strong> {medecin ? medecin.specialite : "Inconnu"}</p>
    </div>
  );
}

export default RendezVousDetails;
