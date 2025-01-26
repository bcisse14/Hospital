import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUrgence, deleteUrgence } from "../../api/urgence";
import { getPatients } from "../../api/patient";

function UrgenceList() {
  const [urgences, setUrgences] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [urgenceData, patientsData] = await Promise.all([
          getUrgence(),
          getPatients(),
        ]);
        setUrgences(urgenceData);
        setPatients(patientsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUrgence(id);
      alert("Urgence supprimée avec succès !");
      setUrgences(urgences.filter((urgence) => urgence.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/urgence/edit/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/urgence/details/${id}`);
  };

  const filteredUrgences = urgences.filter((urgence) => {
    const patientId =
      typeof urgence.patient === "string"
        ? parseInt(urgence.patient.split("/").pop(), 10)
        : urgence.patient.id;

    const patient = patients.find((p) => p.id === patientId);
    const patientName = patient
      ? `${patient.nom} ${patient.prenom}`.toLowerCase()
      : "";

    return searchQuery === "" || patientName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="urgence-list">
      <h2>Liste des Urgences</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un patient"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ul>
        {filteredUrgences.map((urgence) => {
          const patientId =
            typeof urgence.patient === "string"
              ? parseInt(urgence.patient.split("/").pop(), 10)
              : urgence.patient.id;

          const patient = patients.find((p) => p.id === patientId);

          const patientName = patient
            ? `${patient.nom} ${patient.prenom}`
            : "Inconnu";
          const patientAge = patient
            ? `${new Date().getFullYear() - new Date(patient.dateNaissance).getFullYear()} ans`
            : "Âge non spécifié";

          return (
            <li key={urgence.id}>
              <div>
                <strong>Patient :</strong> {patientName}, {patientAge}
              </div>
              <div className="action-buttons">
                <button onClick={() => handleDetails(urgence.id)}>
                  Voir les détails
                </button>
                <button onClick={() => handleDelete(urgence.id)}>
                  Supprimer
                </button>
                <button onClick={() => handleEdit(urgence.id)}>
                  Modifier
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UrgenceList;
