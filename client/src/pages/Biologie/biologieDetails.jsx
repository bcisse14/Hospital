import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBiologieById } from "../../api/biologie";
import { getPatients } from "../../api/patient";
import { getUsers } from "../../api/user";
import "../../assets/unified.css";

function BiologieDetails() {
  const { id } = useParams();
  const [biologie, setBiologie] = useState(null);
  const [patient, setPatient] = useState(null);
  const [technicien, setTechnicien] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const biologieData = await getBiologieById(id);
        setBiologie(biologieData);

        const patientId = biologieData.patient
          ? parseInt(biologieData.patient.split("/").pop(), 10)
          : null;
        const technicienId = biologieData.technicien
          ? parseInt(biologieData.technicien.split("/").pop(), 10)
          : null;

        if (patientId) {
          const patientData = await getPatients(patientId);
          setPatient(patientData ? patientData[0] : null);
        }

        if (technicienId) {
          const technicienData = await getUsers(technicienId);
          setTechnicien(technicienData ? technicienData[0] : null);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!biologie || !patient || !technicien) {
    return <div>Chargement des détails...</div>;
  }

  const formattedExamenDate = new Date(biologie.date_examen).toLocaleDateString("fr-FR");

  return (
    <div className="biologie-details">
      <h2>Détails de la Biologie</h2>

      <h3>Informations de la Biologie</h3>
      <p><strong>Type d'examen :</strong> {biologie.type_examen}</p>
      <p><strong>Date :</strong> {formattedExamenDate}</p>
      <p><strong>Résultat :</strong> {biologie.resultat || "Non spécifié"}</p>
      <p><strong>Commentaires :</strong> {biologie.commentaires || "Non spécifié"}</p>
      <p><strong>Statut :</strong> {biologie.statut || "Non spécifié"}</p>

      <h3>Informations du Patient</h3>
      <p><strong>Nom :</strong> {patient ? patient.nom : "Inconnu"}</p>
      <p><strong>Prénom :</strong> {patient ? patient.prenom : "Inconnu"}</p>
      <p><strong>Date de Naissance :</strong> {patient ? new Date(patient.date_naissance).toLocaleDateString("fr-FR") : "Inconnu"}</p>
      <p><strong>Adresse :</strong> {patient ? patient.adresse : "Inconnu"}</p>
      <p><strong>Téléphone :</strong> {patient ? patient.telephone : "Inconnu"}</p>
      <p><strong>Numéro de Sécurité Sociale :</strong> {patient ? patient.num_secu_social : "Inconnu"}</p>
      <p><strong>Sexe :</strong> {patient ? patient.sexe : "Inconnu"}</p>

      <h3>Informations du Technicien</h3>
      <p><strong>Nom :</strong> {technicien ? technicien.nom : "Inconnu"}</p>
      <p><strong>Prénom :</strong> {technicien ? technicien.prenom : "Inconnu"}</p>
      <p><strong>Téléphone :</strong> {technicien ? technicien.telephone : "Inconnu"}</p>
      <p><strong>Email :</strong> {technicien ? technicien.email : "Inconnu"}</p>
    </div>
  );
}

export default BiologieDetails;