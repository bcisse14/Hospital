import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRadiologieById } from "../../api/radiologie";
import { getPatients } from "../../api/patient";
import { getUsers } from "../../api/user";
import "../../assets/unified.css";

function RadiologieDetails() {
  const { id } = useParams();
  const [radiologie, setRadiologie] = useState(null);
  const [patient, setPatient] = useState(null);
  const [technicien, setTechnicien] = useState(null);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const radiologieData = await getRadiologieById(id);
        setRadiologie(radiologieData);

        const patientId = radiologieData.patient
          ? parseInt(radiologieData.patient.split("/").pop(), 10)
          : null;
        const technicienId = radiologieData.technicien
          ? parseInt(radiologieData.technicien.split("/").pop(), 10)
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

  if (!radiologie || !patient || !technicien) {
    return <div>Chargement des détails...</div>;
  }

  const formattedExamenDate = new Date(radiologie.date_examen).toLocaleDateString("fr-FR");

  return (
    <div className="radiologie-details">
      <h2>Détails de la Radiologie</h2>

      <h3>Informations de la Radiologie</h3>
      <p><strong>Type d'examen :</strong> {radiologie.type_examen}</p>
      <p><strong>Date :</strong> {formattedExamenDate}</p>
      <p><strong>Résultat :</strong> {radiologie.resultat || "Non spécifié"}</p>
      <p><strong>Images :</strong></p>
      {radiologie.images ? (
        <button onClick={() => setShowImage(true)}>Afficher l'image</button>
      ) : (
        <p>Non spécifié</p>
      )}

      {showImage && (
        <div className="modal" onClick={() => setShowImage(false)}>
          <img src={radiologie.images} alt="Radiologie" className="modal-content" />
        </div>
      )}

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

export default RadiologieDetails;