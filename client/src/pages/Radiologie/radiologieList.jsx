import React, { useEffect, useState } from "react";
import { getRadiologie, deleteRadiologie } from "../../api/radiologie";
import { getPatients } from "../../api/patient";
import { getUsers } from "../../api/user";
import { useNavigate } from "react-router-dom";
import "../../assets/unified.css";

function RadiologieList() {
  const [radiologies, setRadiologies] = useState([]);
  const [patients, setPatients] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [radiologiesData, patientsData, techniciensData] = await Promise.all([
          getRadiologie(),
          getPatients(),
          getUsers(),
        ]);

        setRadiologies(radiologiesData);
        setPatients(patientsData);
        setTechniciens(techniciensData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  const extractIdFromUrl = (url) => parseInt(url.split("/").pop(), 10);

  const handleDelete = async (id) => {
    try {
      await deleteRadiologie(id);
      setRadiologies((prev) => prev.filter((radiologie) => radiologie.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/radiologie/edit/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/radiologie/details/${id}`);
  };

  const filteredRadiologies = radiologies.filter((radiologie) => {
    const patientId = extractIdFromUrl(radiologie.patient);
    const technicienId = extractIdFromUrl(radiologie.technicien);

    const patient = patients.find((p) => p.id === patientId);
    const technicien = techniciens.find((t) => t.id === technicienId);

    const patientName = patient ? `${patient.nom} ${patient.prenom}` : "";
    const technicienName = technicien ? `${technicien.nom} ${technicien.prenom}` : "";

    return (
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      technicienName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const sortedRadiologies = [...filteredRadiologies].sort((a, b) => {
    const dateA = new Date(a.date_examen);
    const dateB = new Date(b.date_examen);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="radiologie-list">
      <h2>Liste des Radiologies</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Rechercher par nom de patient ou technicien"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSortToggle}>
          Trier par date ({sortOrder === "asc" ? "croissant" : "décroissant"})
        </button>
      </div>

      <ul>
        {sortedRadiologies.map((radiologie) => {
          const patientId = extractIdFromUrl(radiologie.patient);
          const technicienId = extractIdFromUrl(radiologie.technicien);

          const patient = patients.find((p) => p.id === patientId);
          const technicien = techniciens.find((t) => t.id === technicienId);

          const patientName = patient ? `${patient.nom} ${patient.prenom}` : "Inconnu";
          const technicienName = technicien ? `${technicien.nom} ${technicien.prenom}` : "Inconnu";

          return (
            <li key={radiologie.id}>
              <strong>Patient:</strong> {patientName} <br />
              <strong>Technicien:</strong> {technicienName} <br />
              <strong>Date:</strong>{" "}
              {new Date(radiologie.date_examen).toLocaleDateString()}
              <div className="action-buttons">
                <button onClick={() => handleDetails(radiologie.id)}>Voir les détails</button>
                <button onClick={() => handleDelete(radiologie.id)}>Supprimer</button>
                <button onClick={() => handleEdit(radiologie.id)}>Modifier</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RadiologieList;