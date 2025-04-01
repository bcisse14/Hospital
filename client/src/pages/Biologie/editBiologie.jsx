import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getBiologieById, updateBiologie } from "../../api/biologie";
import { getPatients } from "../../api/patient";
import { getUsers } from "../../api/user";
import "../../assets/consultation.css";

function EditBiologie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [patients, setPatients] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [technicienSearch, setTechnicienSearch] = useState("");
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
  const [showTechnicienSuggestions, setShowTechnicienSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [biologie, patientsData, techniciensData] = await Promise.all([
          getBiologieById(id),
          getPatients(),
          getUsers(),
        ]);

        setPatients(patientsData);
        setTechniciens(techniciensData);

        const patientId = parseInt(biologie.patient.split("/").pop());
        const technicienId = parseInt(biologie.technicien.split("/").pop());

        const patient = patientsData.find((p) => p.id === patientId);
        const technicien = techniciensData.find((t) => t.id === technicienId);

        setValue("patient", patient ? `${patient.nom} ${patient.prenom}` : "");
        setValue("type_examen", biologie.type_examen || "");
        setValue("date_examen", biologie.date_examen?.split("T")[0] || "");
        setValue("resultat", biologie.resultat || "");
        setValue("technicien", technicien ? `${technicien.nom} ${technicien.prenom}` : "");
        setValue("commentaires", biologie.commentaires || "");
        setValue("statut", biologie.statut || "");

        setPatientSearch(patient ? `${patient.nom} ${patient.prenom}` : "");
        setTechnicienSearch(technicien ? `${technicien.nom} ${technicien.prenom}` : "");

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const selectedPatient = patients.find(
        (p) => `${p.nom} ${p.prenom}` === data.patient
      );
      const selectedTechnicien = techniciens.find(
        (t) => `${t.nom} ${t.prenom}` === data.technicien
      );

      const updatedData = {
        ...data,
        patient: selectedPatient ? selectedPatient.url : data.patient,
        technicien: selectedTechnicien ? selectedTechnicien.url : data.technicien,
      };

      await updateBiologie(id, updatedData);
      alert("Biologie modifiée avec succès !");
      navigate("/biologie/list");
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
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

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="edit-biologie">
      <h2>Modifier Biologie</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Patient :</label>
          <input
            type="text"
            placeholder="Rechercher un patient"
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            onClick={() => setShowPatientSuggestions(true)}
            {...register("patient", { required: true })}
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
            {...register("technicien", { required: true })}
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
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default EditBiologie;