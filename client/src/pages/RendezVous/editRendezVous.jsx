import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRendezvousById, updateRendezvous } from "../../api/rendezVous";
import { getPatients } from "../../api/patient";
import { getMedecin } from "../../api/medecin";
// import "../../assets/rendezvous.css";

function EditRendezVous() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [rendezvous, patientsData, medecinsData] = await Promise.all([
          getRendezvousById(id),
          getPatients(),
          getMedecin(),
        ]);

        setPatients(patientsData);
        setMedecins(medecinsData);

        const patientId = parseInt(rendezvous.patient.split("/").pop());
        const patient = patientsData.find((p) => p.id === patientId);

        const medecinId = parseInt(rendezvous.medecin.split("/").pop());
        const medecin = medecinsData.find((m) => m.id === medecinId);

        setFormData({
          patient: patient ? patient.id : "",
          medecin: medecin ? medecin.id : "",
          dateRendezvous: rendezvous.dateRendezvous?.split("T")[0] || "",
          statut: rendezvous.statut,
        });

        setPatientSearch(patient ? `${patient.nom} ${patient.prenom}` : "");
        setMedecinSearch(medecin ? `${medecin.nom} ${medecin.prenom}` : "");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      patient: `https://example.com/api/patients/${formData.patient}`,
      medecin: `https://example.com/api/medecins/${formData.medecin}`,
    };

    try {
      await updateRendezvous(id, updatedData);
      alert("Rendez-vous mis à jour avec succès !");
      navigate("/rendezvous/list");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rendez-vous :", error);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.nom} ${patient.prenom}`.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const filteredMedecins = medecins.filter((medecin) =>
    `${medecin.nom} ${medecin.prenom}`.toLowerCase().includes(medecinSearch.toLowerCase())
  );

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="edit-rendezvous">
      <h2>Modifier un Rendez-vous</h2>
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
                  {medecin.nom} {medecin.prenom}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label>Date du Rendez-vous :</label>
          <input
            type="date"
            name="dateRendezvous"
            value={formData.dateRendezvous}
            onChange={handleChange}
            required
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
            <option value="annulé">Annulé</option>
            <option value="confirmé">Confirmé</option>
          </select>
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default EditRendezVous;
