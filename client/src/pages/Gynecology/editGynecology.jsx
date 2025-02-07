import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGynecologyById, updateGynecology } from "../../api/gynecologie";
import { getPatients, getPatientById } from "../../api/patient";

function EditGynecology() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchGynecology = async () => {
      try {
        const gynecology = await getGynecologyById(id);
        if (!gynecology) {
          alert("Consultation introuvable !");
          navigate("/gynecologie/list");
          return;
        }
        console.log("Fetched gynecology:", gynecology);

        const patientId = gynecology.patient.split("/").pop();
        const patient = await getPatientById(patientId);
        console.log("Fetched patient:", patient);

        setFormData({
          patient: patientId,
          date_consultation: new Date(gynecology.date_consultation).toISOString().slice(0, 16),
          diagnostic: gynecology.diagnostic,
          plan_traitement: gynecology.plan_traitement,
          date_suivi: gynecology.date_suivi ? new Date(gynecology.date_suivi).toISOString().slice(0, 16) : "",
        });
        setPatientSearch(`${patient.nom} ${patient.prenom}`);
      } catch (error) {
        console.error("Erreur lors de la récupération de la consultation:", error);
        alert("Erreur de connexion au serveur. Veuillez réessayer.");
      }
    };

    const fetchPatients = async () => {
      try {
        const patientsData = await getPatients();
        console.log("Fetched patients:", patientsData);
        setPatients(patientsData);
      } catch (error) {
        console.error("Erreur lors du chargement des données des patients:", error);
      }
    };

    fetchGynecology();
    fetchPatients();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      const updatedFormData = {
        ...formData,
        patient: `https://example.com/api/patients/${formData.patient}`,
        date_suivi: formData.date_suivi ? formData.date_suivi : null,
      };
      const response = await updateGynecology(id, updatedFormData);
      console.log("Update response:", response);
      alert("Consultation modifiée avec succès !");
      navigate("/gynecologie/list");
    } catch (error) {
      console.error("Erreur lors de la modification de la consultation:", error);
      alert("Impossible de modifier la consultation. Veuillez vérifier les données ou réessayer plus tard.");
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
    <div className="edit-gynecology">
      <h2>Modifier la Consultation Gynécologique</h2>
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
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default EditGynecology;