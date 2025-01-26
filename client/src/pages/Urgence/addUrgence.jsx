import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUrgence } from "../../api/urgence";
import { getPatients } from "../../api/patient";
import "../../assets/hospitalisation.css";

function AddUrgence() {
  const [formData, setFormData] = useState({
    patient: "",
    HeureArrivee: "",
    EtapeActuelle: "",
    EtapeSuivante: "",
    statut: "en_attente",
    HeureSortie: "",
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
        console.error("Erreur lors du chargement des patients :", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toISOString(); // Transforme en chaîne ISO 8601
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      patient: `https://example.com/api/patients/${formData.patient}`,
      heure_arrivee: formData.HeureArrivee ? formatDate(formData.HeureArrivee) : null,
      etape_actuelle: formData.EtapeActuelle,
      etape_suivante: formData.EtapeSuivante,
      statut: formData.statut,
      heure_sortie: formData.HeureSortie ? formatDate(formData.HeureSortie) : null,
    };

    try {
      await createUrgence(updatedFormData);
      alert("Urgence ajoutée avec succès !");
      navigate("/urgence/list");
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Détails de l'erreur API :", error.response.data);
        alert(`Erreur lors de l'ajout de l'urgence : ${error.response.data.message}`);
      } else {
        console.error("Erreur réseau ou autre :", error);
        alert("Une erreur réseau s'est produite. Veuillez réessayer.");
      }
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
    <div className="add-urgence">
      <h2>Ajouter une Urgence</h2>
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
          <label>Heure d'Arrivée :</label>
          <input
            type="datetime-local"
            name="HeureArrivee"
            value={formData.HeureArrivee}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Étape Actuelle :</label>
          <input
            type="text"
            name="EtapeActuelle"
            value={formData.EtapeActuelle}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Étape Suivante :</label>
          <input
            type="text"
            name="EtapeSuivante"
            value={formData.EtapeSuivante}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Statut :</label>
          <select
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            required
          >
            <option value="en_attente">En attente</option>
            <option value="en_cours">En cours</option>
            <option value="terminé">Terminé</option>
          </select>
        </div>
        <div>
          <label>Heure de Sortie :</label>
          <input
            type="datetime-local"
            name="HeureSortie"
            value={formData.HeureSortie}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddUrgence;
