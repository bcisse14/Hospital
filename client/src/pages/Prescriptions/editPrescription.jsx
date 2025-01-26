import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPrescriptionById, updatePrescription } from "../../api/prescription";

function EditPrescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient: "",
    medicament: "",
    dose: "",
    frequence: "",
    datePrescription: "",
    prescripteur: "",
  });

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const data = await getPrescriptionById(id);
        setFormData({
          patient: data.patient,
          medicament: data.medicament,
          dose: data.dose,
          frequence: data.frequence,
          datePrescription: new Date(data.datePrescription).toISOString().slice(0, 16),
          prescripteur: data.prescripteur,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération de la prescription :", error);
      }
    };

    fetchPrescription();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePrescription(id, formData);
      navigate("/prescription");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la prescription :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="prescription-form">
      <h2>Modifier la Prescription</h2>
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
      <button type="submit">Mettre à jour</button>
    </form>
  );
}

export default EditPrescription;
