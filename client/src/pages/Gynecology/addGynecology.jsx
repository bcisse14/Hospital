import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createGynecology } from "../../api/gynecologie";
import { getPatients } from "../../api/patient";

function AddGynecology() {
  const [formData, setFormData] = useState({
    patient: "",
    date_consultation: "",
    diagnostic: "",
    plan_traitement: "",
    date_suivi: "",
  });

  const [patients, setPatients] = useState([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      patient: `https://example.com/api/patients/${formData.patient}`,
      date_suivi: formData.date_suivi ? formData.date_suivi : null,
    };

    try {
      await createGynecology(updatedFormData);
      alert("Consultation ajoutée avec succès !");
      navigate("/gynecologie/list");
      setFormData({
        patient: "",
        date_consultation: "",
        diagnostic: "",
        plan_traitement: "",
        date_suivi: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la consultation :", error);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.nom} ${patient.prenom}`.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const handlePatientSearchClick = () => {
    setShowPatientSuggestions(true);
  };

  const handleSelectPatient = (patient) => {
    setFormData({ ...formData, patient: patient.id });
    setPatientSearch(`${patient.nom} ${patient.prenom}`);
    setShowPatientSuggestions(false);
  };

  return (
    <div className="add-gynecology">
      <h2>Ajouter une Consultation Gynécologique</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient :</label>
          <input
            type="text"
            placeholder="Rechercher un patient"
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            onClick={handlePatientSearchClick}
          />
          {showPatientSuggestions && (
            <div className="suggestions-list">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="suggestion-item"
                  onClick={() => handleSelectPatient(patient)}
                >
                  {patient.nom} {patient.prenom}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label>Date de Consultation :</label>
          <input
            type="datetime-local"
            name="date_consultation"
            value={formData.date_consultation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Diagnostic :</label>
          <input
            type="text"
            name="diagnostic"
            value={formData.diagnostic}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Plan de Traitement :</label>
          <input
            type="text"
            name="plan_traitement"
            value={formData.plan_traitement}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date de Suivi :</label>
          <input
            type="datetime-local"
            name="date_suivi"
            value={formData.date_suivi}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddGynecology;