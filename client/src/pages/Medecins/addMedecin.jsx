import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMedecin } from "../../api/medecin";

function AddMedecin() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    adresse: "",
    specialite: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMedecin(formData);
      alert("Médecin ajouté avec succès !");
      navigate("/medecins/list");
    } catch (error) {
      console.error("Erreur lors de l'ajout du médecin :", error);
    }
  };

  return (
    <div className="add-medecin">
      <h2>Ajouter un Médecin</h2>
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
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
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
          <label>Spécialité :</label>
          <input
            type="text"
            name="specialite"
            value={formData.specialite}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddMedecin;
