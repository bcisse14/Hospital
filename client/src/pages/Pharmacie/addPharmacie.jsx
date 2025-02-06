import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate
import { createPharmacie } from "../../api/pharmacie";

function AddMedicament() {
  const [formData, setFormData] = useState({
    medicament: "",
    description: "",
    stock: 0,
    date_peremption: "",
    numero_lot: "",
    emplacement: "",
  });

  const navigate = useNavigate(); // Création du hook de navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Préparer les données avant l'envoi
    const payload = {
      ...formData,
      stock: parseInt(formData.stock, 10), // Convertir le stock en nombre
      date_peremption: new Date(formData.date_peremption).toISOString(), // Convertir la date au format ISO
    };

    console.log("Payload envoyé :", payload); // Vérification des données envoyées

    try {
      await createPharmacie(payload);
      alert("Médicament ajouté avec succès !");

      // Redirection vers la liste des médicaments après l'ajout
      navigate("/pharmacie/list");

      // Réinitialiser le formulaire après l'ajout
      setFormData({
        medicament: "",
        description: "",
        stock: 0,
        date_peremption: "",
        numero_lot: "",
        emplacement: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du médicament :", error);
    }
  };

  return (
    <div className="add-medicament">
      <h2>Ajouter un Médicament</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du Médicament :</label>
          <input
            type="text"
            name="medicament"
            value={formData.medicament}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description :</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock :</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div>
          <label>Date de Péremption :</label>
          <input
            type="date"
            name="date_peremption"
            value={formData.date_peremption}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Numéro de Lot :</label>
          <input
            type="text"
            name="numero_lot"
            value={formData.numero_lot}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Emplacement :</label>
          <input
            type="text"
            name="emplacement"
            value={formData.emplacement}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddMedicament;