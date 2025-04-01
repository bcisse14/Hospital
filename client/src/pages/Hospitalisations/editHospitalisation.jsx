import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHospitalisationById, updateHospitalisation } from "../../api/hospitalisation";
import { getPatients } from "../../api/patient";
import "../../assets/unified.css";

function EditHospitalisation() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [hospitalisation, patientsData] = await Promise.all([
          getHospitalisationById(id),
          getPatients(),
        ]);

        setPatients(patientsData);

        const patientId = parseInt(hospitalisation.patient.split("/").pop());
        const patient = patientsData.find((p) => p.id === patientId);

        setFormData({
          patient: patient ? patient.id : "",
          date_entree: hospitalisation.date_entree?.split("T")[0] || "",
          date_sortie: hospitalisation.date_sortie?.split("T")[0] || "",
          chambre: hospitalisation.chambre,
          remarques: hospitalisation.remarques,
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
      await updateHospitalisation(id, updatedData);
      alert("Hospitalisation mise à jour avec succès !");
      navigate("/hospitalisations/list");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'hospitalisation :", error);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.nom} ${patient.prenom}`
      .toLowerCase()
      .includes(patientSearch.toLowerCase())
  );

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="add-hospitalisation">
      <h2>Modifier une Hospitalisation</h2>
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
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default EditHospitalisation;