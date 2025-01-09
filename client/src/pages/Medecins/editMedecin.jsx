import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMedecinById, updateMedecin } from "../../api/medecin";

function EditMedecin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    adresse: "",
    specialite: "",
  });

  useEffect(() => {
    const fetchMedecin = async () => {
      try {
        const medecin = await getMedecinById(id);
        setFormData({
          nom: medecin.nom,
          prenom: medecin.prenom,
          telephone: medecin.telephone,
          email: medecin.email,
          adresse: medecin.adresse,
          specialite: medecin.specialite,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération du médecin :", error);
      }
    };
    fetchMedecin();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMedecin(id, formData);
      alert("Médecin modifié avec succès !");
      navigate("/medecins/list");
    } catch (error) {
      console.error("Erreur lors de la modification du médecin :", error);
    }
  };

  return (
    <div className="edit-medecin">
      <h2>Modifier les informations du Médecin</h2>
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
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default EditMedecin;
