import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRendezvous } from "../../api/rendezVous";
import { getPatients } from "../../api/patient";
import { getMedecin } from "../../api/medecin";
import "../../assets/hospitalisation.css";

function AddRendezVous() {
  const [formData, setFormData] = useState({
    patient: "",
    medecin: "",
    dateRendezvous: "",
    statut: "en_attente",
  });

  const [patients, setPatients] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [medecinSearch, setMedecinSearch] = useState("");
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
  const [showMedecinSuggestions, setShowMedecinSuggestions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await getPatients();
        const medecinsData = await getMedecin();
        setPatients(patientsData);
        setMedecins(medecinsData);
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
      medecin: `https://example.com/api/medecins/${formData.medecin}`,
    };

    try {
      await createRendezvous(updatedFormData);
      alert("Rendez-vous ajouté avec succès !");
      navigate("/rendezvous/list");
    } catch (error) {
      console.error("Erreur lors de l'ajout du rendez-vous :", error);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.nom} ${patient.prenom}`.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const filteredMedecins = medecins.filter((medecin) =>
    `${medecin.nom} ${medecin.prenom}`.toLowerCase().includes(medecinSearch.toLowerCase())
  );

  const handlePatientSearchClick = () => {
    setShowPatientSuggestions(true);
  };

  const handleMedecinSearchClick = () => {
    setShowMedecinSuggestions(true);
  };

  const handleSelectPatient = (patient) => {
    setFormData({ ...formData, patient: patient.id });
    setPatientSearch(`${patient.nom} ${patient.prenom}`);
    setShowPatientSuggestions(false);
  };

  const handleSelectMedecin = (medecin) => {
    setFormData({ ...formData, medecin: medecin.id });
    setMedecinSearch(`${medecin.nom} ${medecin.prenom}`);
    setShowMedecinSuggestions(false);
  };

  return (
    <div className="add-rendezvous">
      <h2>Ajouter un Rendez-vous</h2>
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
          <label>Médecin :</label>
          <input
            type="text"
            placeholder="Rechercher un médecin"
            value={medecinSearch}
            onChange={(e) => setMedecinSearch(e.target.value)}
            onClick={handleMedecinSearchClick}
          />
          {showMedecinSuggestions && (
            <div className="suggestions-list">
              {filteredMedecins.map((medecin) => (
                <div
                  key={medecin.id}
                  className="suggestion-item"
                  onClick={() => handleSelectMedecin(medecin)}
                >
                  Dr. {medecin.nom} {medecin.prenom}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label>Date du Rendez-vous :</label>
          <input
            type="datetime-local"
            name="dateRendezvous"
            value={formData.dateRendezvous}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddRendezVous;
