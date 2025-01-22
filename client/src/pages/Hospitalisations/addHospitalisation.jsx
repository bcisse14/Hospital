import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createHospitalisation } from "../../api/hospitalisation";
import { getPatients } from "../../api/patient";
import "../../assets/hospitalisation.css";

function AddHospitalisation() {
  const [formData, setFormData] = useState({
    patient: "",
    date_entree: "",
    date_sortie: "",
    chambre: "",
    remarques: "",
  });

  const [patients, setPatients] = useState([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error("Erreur lors du chargement des patients :", error);
      }
    };

    fetchPatients();
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
    };

    try {
      await createHospitalisation(updatedFormData);
      alert("Hospitalisation ajoutée avec succès !");
      navigate("/hospitalisations/list");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'hospitalisation :", error);
    }
  };

  // Filtrage des patients en fonction de la recherche
  const filteredPatients = patients.filter((patient) =>
    `${patient.nom} ${patient.prenom}`
      .toLowerCase()
      .includes(patientSearch.toLowerCase())
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
    <div className="add-hospitalisation">
      <h2>Ajouter une Hospitalisation</h2>
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
          <label>Date d'entrée :</label>
          <input
            type="date"
            name="date_entree"
            value={formData.date_entree}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date de sortie :</label>
          <input
            type="date"
            name="date_sortie"
            value={formData.date_sortie}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Chambre :</label>
          <input
            type="text"
            name="chambre"
            value={formData.chambre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Remarques :</label>
          <textarea
            name="remarques"
            value={formData.remarques}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddHospitalisation;
