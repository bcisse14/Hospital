import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createBiologie } from "../../api/biologie";
import { getPatients } from "../../api/patient";
import { getUsers } from "../../api/user";
import "../../assets/hospitalisation.css";

function AddBiologie() {
  const { register, handleSubmit, setValue } = useForm();
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

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      patient: `https://example.com/api/patients/${data.patient}`,
      technicien: `https://example.com/api/users/${data.technicien}`,
    };

    try {
      await createBiologie(updatedData);
      alert("Biologie ajoutée avec succès !");
      navigate("/biologie/list");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la biologie :", error);
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

  const handleSelectPatient = (patient) => {
    setValue("patient", patient.id);
    setPatientSearch(`${patient.nom} ${patient.prenom}`);
    setShowPatientSuggestions(false);
  };

  const handleSelectTechnicien = (technicien) => {
    setValue("technicien", technicien.id);
    setTechnicienSearch(`${technicien.nom} ${technicien.prenom}`);
    setShowTechnicienSuggestions(false);
  };

  return (
    <div className="add-biologie">
      <h2>Ajouter une Biologie</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Patient :</label>
          <input
            type="text"
            placeholder="Rechercher un patient"
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            onClick={() => setShowPatientSuggestions(true)}
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
            {...register("type_examen", { required: true })}
          />
        </div>
        <div>
          <label>Date Examen :</label>
          <input
            type="date"
            name="date_examen"
            {...register("date_examen", { required: true })}
          />
        </div>
        <div>
          <label>Résultat :</label>
          <textarea
            name="resultat"
            {...register("resultat")}
          />
        </div>
        <div>
          <label>Technicien :</label>
          <input
            type="text"
            placeholder="Rechercher un technicien"
            value={technicienSearch}
            onChange={(e) => setTechnicienSearch(e.target.value)}
            onClick={() => setShowTechnicienSuggestions(true)}
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
          <label>Commentaires :</label>
          <textarea
            name="commentaires"
            {...register("commentaires")}
          />
        </div>
        <div>
          <label>Statut :</label>
          <input
            type="text"
            name="statut"
            {...register("statut")}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddBiologie;