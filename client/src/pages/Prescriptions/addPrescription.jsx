import React, { useState } from "react";
import { createPrescription } from "../../api/prescription";
import { useNavigate } from "react-router-dom";

function AddPrescription() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient: "",
    medicament: "",
    dose: "",
    frequence: "",
    datePrescription: "",
    prescripteur: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPrescription(formData);
      navigate("/prescription");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la prescription :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="prescription-form">
      <h2>Ajouter une Prescription</h2>
      <label>
        Patient (URL):
        <input
          type="text"
          name="patient"
          value={formData.patient}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Médicament (URL):
        <input
          type="text"
          name="medicament"
          value={formData.medicament}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Dose:
        <input
          type="text"
          name="dose"
          value={formData.dose}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Fréquence:
        <input
          type="text"
          name="frequence"
          value={formData.frequence}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date de Prescription:
        <input
          type="datetime-local"
          name="datePrescription"
          value={formData.datePrescription}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Prescripteur (URL):
        <input
          type="text"
          name="prescripteur"
          value={formData.prescripteur}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default AddPrescription;
