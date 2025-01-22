import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMedecin } from "../../api/medecin";
import { getHospitalisationById } from "../../api/hospitalisation";
import { getConsultationById } from "../../api/consultation";
import { getRendezvousById } from "../../api/rendezVous";

function MedecinDetail() {
  const { id } = useParams(); // Récupère l'ID du médecin depuis l'URL
  const [medecin, setMedecin] = useState(null); // Données du médecin
  const [hospitalisations, setHospitalisations] = useState([]); // Données des hospitalisations
  const [consultations, setConsultations] = useState([]); // Données des consultations
  const [rendezvous, setRendezvous] = useState([]); // Données des rendez-vous

  useEffect(() => {
    const fetchMedecinDetails = async () => {
      try {
        console.log(`Récupération des données pour le médecin avec l'ID: ${id}`);
        const medecinData = await getMedecin(id); // Récupérer les données du médecin
        console.log("Données du médecin récupérées :", medecinData);

        // Vérifier si le médecin récupéré correspond à l'ID
        const medecinInfo = medecinData.find((med) => med.id === parseInt(id));
        console.log("Détails du médecin récupéré :", medecinInfo);

        if (!medecinInfo) {
          console.error(`Aucun médecin trouvé pour l'ID: ${id}`);
          return;
        }

        setMedecin(medecinInfo); // Mettre à jour l'état du médecin

        // Récupérer les hospitalisations, consultations et rendez-vous associés
        const hospitalisationsLinks = medecinInfo.hospitalisations || [];
        const consultationsLinks = medecinInfo.consultations || [];
        const rendezvousLinks = medecinInfo.rendezVous || [];

        console.log("Hospitalisations liées au médecin :", hospitalisationsLinks);
        console.log("Consultations liées au médecin :", consultationsLinks);
        console.log("Rendez-vous liés au médecin :", rendezvousLinks);

        // Récupérer les données des hospitalisations, consultations, et rendez-vous
        const hospitalisationsData = await Promise.all(
          hospitalisationsLinks.map((link) => getHospitalisationById(link.split("/").pop()))
        );
        console.log("Données des hospitalisations récupérées :", hospitalisationsData);

        const consultationsData = await Promise.all(
          consultationsLinks.map((link) => getConsultationById(link.split("/").pop()))
        );
        console.log("Données des consultations récupérées :", consultationsData);

        const rendezvousData = await Promise.all(
          rendezvousLinks.map((link) => getRendezvousById(link.split("/").pop()))
        );
        console.log("Données des rendez-vous récupérées :", rendezvousData);

        // Filtrer les consultations et rendez-vous par l'ID du médecin
        const filteredConsultations = consultationsData.filter((consultation) => {
          const medecinId = consultation.medecin.split("/").pop(); // ID du médecin dans la consultation
          console.log(`Consultation pour le médecin ${medecinId} - Filtre appliqué pour l'ID: ${id}`);
          return medecinId === id; // Comparer l'ID de la consultation avec l'ID du médecin
        });
        console.log("Consultations filtrées :", filteredConsultations);

        const filteredRendezvous = rendezvousData.filter((rdv) => {
          const medecinId = rdv.medecin.split("/").pop(); // ID du médecin dans le rendez-vous
          console.log(`Rendez-vous pour le médecin ${medecinId} - Filtre appliqué pour l'ID: ${id}`);
          return medecinId === id; // Comparer l'ID du rendez-vous avec l'ID du médecin
        });
        console.log("Rendez-vous filtrés :", filteredRendezvous);

        // Mettre à jour les états avec les données filtrées
        setHospitalisations(hospitalisationsData);
        setConsultations(filteredConsultations);
        setRendezvous(filteredRendezvous);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du médecin :", error);
      }
    };

    fetchMedecinDetails();
  }, [id]);

  if (!medecin) {
    return <div>Chargement des détails...</div>; // Affichage pendant le chargement des données
  }

  return (
    <div className="medecin-details">
      <h2>Détails du Médecin</h2>
      <p><strong>Nom :</strong> {medecin.nom}</p>
      <p><strong>Prénom :</strong> {medecin.prenom}</p>
      <p><strong>Téléphone :</strong> {medecin.telephone}</p>
      <p><strong>Email :</strong> {medecin.email}</p>
      <p><strong>Spécialité :</strong> {medecin.specialite}</p>



      {/* Affichage des consultations */}
      <h3>Consultations associées</h3>
      {consultations.length === 0 ? (
        <p>Aucune consultation trouvée.</p>
      ) : (
        <ul>
          {consultations.map((consultation) => (
            <li key={consultation.id}>
              <p><strong>Date :</strong> {new Date(consultation.date_consultation).toLocaleDateString("fr-FR")}</p>
              <p><strong>Diagnostique :</strong> {consultation.diagnostique}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Affichage des rendez-vous */}
      <h3>Rendez-vous associés</h3>
      {rendezvous.length === 0 ? (
        <p>Aucun rendez-vous trouvé.</p>
      ) : (
        <ul>
          {rendezvous.map((rdv) => (
            <li key={rdv.id}>
              <p><strong>Date et Heure :</strong> {new Date(rdv.dateRendezvous).toLocaleString("fr-FR")}</p>
              <p><strong>Statut :</strong> {rdv.statut}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MedecinDetail;
