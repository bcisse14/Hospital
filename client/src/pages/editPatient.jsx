import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPatientById, updatePatient } from "../api/patient";

function EditPatient() {
  const { id } = useParams(); // Récupérer l'id depuis l'URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    adresse: "",
    telephone: "",
    num_secu_social: "",
    sexe: "Femme",
  });
  const [loading, setLoading] = useState(false);

  // Fonction pour formater la date au format YYYY-MM-DD
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Retourne YYYY-MM-DD
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await getPatientById(id);
        setFormData({
          nom: patient.nom || "",
          prenom: patient.prenom || "",
          date_naissance: formatDateForInput(patient.date_naissance) || "",
          adresse: patient.adresse || "",
          telephone: patient.telephone || "",
          num_secu_social: patient.num_secu_social || "",
          sexe: patient.sexe || "Femme",
        });
      } catch (error) {
        console.error("Erreur lors de la récupération du patient :", error);
      }
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePatient(id, formData);
      alert("Patient modifié avec succès !");
      navigate("/patients/list"); // Redirige vers la liste des patients
    } catch (error) {
      console.error("Erreur lors de la modification du patient :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-patient">
      <h2>Modifier les informations du Patient</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? "Modification en cours..." : "Modifier"}
        </button>
      </form>
    </div>
  );
}

export default EditPatient;
