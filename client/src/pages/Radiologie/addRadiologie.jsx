import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRadiologie } from "../../api/radiologie";
import { getPatients } from "../../api/patient";
import { getUsers } from "../../api/user";
import "../../assets/hospitalisation.css";

function AddRadiologie() {
  const [formData, setFormData] = useState({
    patient: "",
    type_examen: "",
    date_examen: "",
    resultat: "",
    technicien: "",
    images: null,
  });

  const [patients, setPatients] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [technicienSearch, setTechnicienSearch] = useState("");
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
  const [showTechnicienSuggestions, setShowTechnicienSuggestions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await getPatients();
        const techniciensData = await getUsers();
        setPatients(patientsData);
        setTechniciens(techniciensData);
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFormData({ ...formData, images: base64 });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      patient: `https://example.com/api/patients/${formData.patient}`,
      technicien: `https://example.com/api/users/${formData.technicien}`,
    };

    // Log updated form data to debug
    console.log("Updated Form Data:", updatedFormData);

    try {
      await createRadiologie(updatedFormData);
      alert("Radiologie ajoutée avec succès !");
      navigate("/radiologie/list");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la radiologie :", error);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.nom} ${patient.prenom}`
      .toLowerCase()
      .includes(patientSearch.toLowerCase())
  );

  const filteredTechniciens = techniciens.filter((technicien) =>
    `${technicien.nom} ${technicien.prenom}`
      .toLowerCase()
      .includes(technicienSearch.toLowerCase())
  );

  const handlePatientSearchClick = () => {
    setShowPatientSuggestions(true);
  };

  const handleTechnicienSearchClick = () => {
    setShowTechnicienSuggestions(true);
  };

  const handleSelectPatient = (patient) => {
    setFormData({ ...formData, patient: patient.id });
    setPatientSearch(`${patient.nom} ${patient.prenom}`);
    setShowPatientSuggestions(false);
  };

  const handleSelectTechnicien = (technicien) => {
    setFormData({ ...formData, technicien: technicien.id });
    setTechnicienSearch(`${technicien.nom} ${technicien.prenom}`);
    setShowTechnicienSuggestions(false);
  };

  return (
    <div className="add-radiologie">
      <h2>Ajouter une Radiologie</h2>
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
          <label>Type d'examen :</label>
          <input
            type="text"
            name="type_examen"
            value={formData.type_examen}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date Examen :</label>
          <input
            type="date"
            name="date_examen"
            value={formData.date_examen}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Résultat :</label>
          <textarea
            name="resultat"
            value={formData.resultat}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Technicien :</label>
          <input
            type="text"
            placeholder="Rechercher un technicien"
            value={technicienSearch}
            onChange={(e) => setTechnicienSearch(e.target.value)}
            onClick={handleTechnicienSearchClick}
          />
          {showTechnicienSuggestions && (
            <div className="suggestions-list">
              {filteredTechniciens.map((technicien) => (
                <div
                  key={technicien.id}
                  className="suggestion-item"
                  onClick={() => handleSelectTechnicien(technicien)}
                >
                  {technicien.nom} {technicien.prenom}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label>Images :</label>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddRadiologie;