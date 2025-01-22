import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatients } from "../../api/patient";
import { getHospitalisationById } from "../../api/hospitalisation";
import { getConsultationById } from "../../api/consultation";
import { getRendezvousById } from "../../api/rendezVous";

function PatientDetail() {
  const { id } = useParams(); // Récupère l'ID du patient depuis l'URL
  const [patient, setPatient] = useState(null); // Données du patient
  const [hospitalisations, setHospitalisations] = useState([]); // Données des hospitalisations
  const [consultations, setConsultations] = useState([]); // Données des consultations
  const [rendezvous, setRendezvous] = useState([]); // Données des rendez-vous

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        console.log(`Récupération des données pour le patient avec l'ID: ${id}`);
        const response = await getPatients(id); // Appel API pour récupérer le patient
        console.log("Données du patient récupérées :", response);

        // Vérifier si le patient récupéré correspond à l'ID
        const patientInfo = response.find((pat) => pat.id === parseInt(id));
        console.log("Détails du patient récupéré :", patientInfo);

        if (!patientInfo) {
          console.error(`Aucun patient trouvé pour l'ID: ${id}`);
          return;
        }

        setPatient(patientInfo); // Mettre à jour l'état du patient

        // Récupérer les hospitalisations, consultations et rendez-vous associés
        const hospitalisationsLinks = patientInfo.hospitalisations || [];
        const consultationsLinks = patientInfo.consultations || [];
        const rendezvousLinks = patientInfo.rendezVous || [];

        console.log("Hospitalisations liées au patient :", hospitalisationsLinks);
        console.log("Consultations liées au patient :", consultationsLinks);
        console.log("Rendez-vous liés au patient :", rendezvousLinks);

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

        // Mettre à jour les états avec les données récupérées
        setHospitalisations(hospitalisationsData);
        setConsultations(consultationsData);
        setRendezvous(rendezvousData);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du patient :", error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (!patient) {
    return <div>Chargement des détails...</div>; // Affichage pendant le chargement des données
  }

  return (
    <div className="patient-details">
      <h2>Détails du Patient</h2>
      <p><strong>Nom :</strong> {patient.nom}</p>
      <p><strong>Prénom :</strong> {patient.prenom}</p>
      <p><strong>Date de Naissance :</strong> {new Date(patient.date_naissance).toLocaleDateString("fr-FR")}</p>
      <p><strong>Adresse :</strong> {patient.adresse}</p>
      <p><strong>Téléphone :</strong> {patient.telephone}</p>
      <p><strong>Numéro de Sécurité Sociale :</strong> {patient.num_secu_social}</p>
      <p><strong>Sexe :</strong> {patient.sexe}</p>

      {/* Affichage des hospitalisations */}
      <h3>Hospitalisations associées</h3>
      {hospitalisations.length === 0 ? (
        <p>Aucune hospitalisation trouvée.</p>
      ) : (
        <ul>
          {hospitalisations.map((hospitalisation) => (
            <li key={hospitalisation.id}>
              <p><strong>Date :</strong> {new Date(hospitalisation.date_entree).toLocaleDateString("fr-FR")}</p>
              <p><strong>Chambre :</strong> {hospitalisation.chambre}</p>
            </li>
          ))}
        </ul>
      )}

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

export default PatientDetail;
