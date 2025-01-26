import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUrgenceById, updateUrgence } from "../../api/urgence";
import { getPatients } from "../../api/patient";

function EditUrgence() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [urgence, patientsData] = await Promise.all([
          getUrgenceById(id),
          getPatients(),
        ]);

        setPatients(patientsData);

        const patientId = parseInt(urgence.patient.split("/").pop());
        const patient = patientsData.find((p) => p.id === patientId);

        setFormData({
          patient: patient ? patient.id : "",
          HeureArrivee: urgence.HeureArrivee,
          EtapeActuelle: urgence.EtapeActuelle,
          EtapeSuivante: urgence.EtapeSuivante,
          statut: urgence.statut,
          HeureSortie: urgence.HeureSortie,
        });

        setPatientSearch(patient ? `${patient.nom} ${patient.prenom}` : "");
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePatientSearchClick = () => {
    setShowPatientSuggestions(true);
  };

  const handleSelectPatient = (patient) => {
    setFormData({ ...formData, patient: patient.id });
    setPatientSearch(`${patient.nom} ${patient.prenom}`);
    setShowPatientSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      patient: `https://example.com/api/patients/${formData.patient}`,
    };

    try {
      await updateUrgence(id, updatedData);
      alert("Urgence mise à jour avec succès !");
      navigate("/urgence/list");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'urgence :", error);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.nom} ${patient.prenom}`.toLowerCase().includes(patientSearch.toLowerCase())
  );

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="edit-urgence">
      <h2>Modifier une Urgence</h2>
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
          />
        </div>
        <div>
          <label>Étape Actuelle :</label>
          <input
            type="text"
            name="EtapeActuelle"
            value={formData.EtapeActuelle}
            onChange={handleChange}
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
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default EditUrgence;
