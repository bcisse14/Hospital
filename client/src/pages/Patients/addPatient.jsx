import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate
import { createPatient } from "../../api/patient";


function AddPatient() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    adresse: "",
    telephone: "",
    num_secu_social: "",
    sexe: "Femme",
    consultations: [],
    rendezVous: [],
    hospitalisations: [],
    date_enregistrement: new Date().toISOString(),
  });

  const navigate = useNavigate(); // Création du hook de navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPatient(formData);
      alert("Patient ajouté avec succès !");
      
      // Redirection vers la liste des patients après l'ajout
      navigate("/patients/list"); 
      
      // Réinitialiser le formulaire après l'ajout
      setFormData({
        nom: "",
        prenom: "",
        date_naissance: "",
        adresse: "",
        telephone: "",
        num_secu_social: "",
        sexe: "Femme",
        consultations: [],
        rendezVous: [],
        hospitalisations: [],
        date_enregistrement: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du patient :", error);
    }
  };

  return (
    <div className="add-patient">
      <h2>Ajouter un Patient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date de Naissance :</label>
          <input
            type="date"
            name="date_naissance"
            value={formData.date_naissance}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Adresse :</label>
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Téléphone :</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Numéro Sécurité Sociale :</label>
          <input
            type="text"
            name="num_secu_social"
            value={formData.num_secu_social}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sexe :</label>
          <select
            name="sexe"
            value={formData.sexe}
            onChange={handleChange}
            required
          >
            <option value="Femme">Femme</option>
            <option value="Homme">Homme</option>
          </select>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddPatient;
