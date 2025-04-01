import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlocOperatoire } from "../../api/bloc";

const AddBloc = () => {
  const [formData, setFormData] = useState({
    numeroBloc: "",
    statut: "",
    chirurgie: "", // Optional field
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      ...formData,
      chirurgie: formData.chirurgie || null, // Set chirurgie to null if empty
    };

    console.log("Payload envoyé :", payload); // Log the payload for debugging

    try {
      await createBlocOperatoire(payload);
      alert("Bloc opératoire ajouté avec succès !");
      console.log("Bloc opératoire ajouté avec succès !"); // Log success message

      // Redirect to the bloc list page
      navigate("/bloc/list");

      // Reset the form after submission
      setFormData({
        numeroBloc: "",
        statut: "",
        chirurgie: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du bloc opératoire :", error);
      alert("Erreur lors de l'ajout du bloc opératoire. Veuillez réessayer.");
    }
  };

  return (
    <div className="add-bloc">
      <h2>Ajouter un Bloc Opératoire</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Numéro du Bloc :</label>
          <input
            type="text"
            name="numeroBloc"
            value={formData.numeroBloc}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Statut :</label>
          <input
            type="text"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Chirurgie (URL) :</label>
          <input
            type="url"
            name="chirurgie"
            value={formData.chirurgie}
            onChange={handleChange}
            placeholder="Ex: https://example.com/ (facultatif)"
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddBloc;