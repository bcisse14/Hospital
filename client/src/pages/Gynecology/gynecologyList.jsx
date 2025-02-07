import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGynecologies, deleteGynecology } from "../../api/gynecologie";
import { getPatients } from "../../api/patient";
import "../../assets/unified.css";

function GynecologyList() {
  const [gynecologies, setGynecologies] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gynecologiesData, patientsData] = await Promise.all([
          getGynecologies(),
          getPatients(),
        ]);

        setGynecologies(gynecologiesData);
        setPatients(patientsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  const extractIdFromUrl = (url) => parseInt(url.split("/").pop(), 10);

  const handleDelete = async (id) => {
    try {
      await deleteGynecology(id);
      setGynecologies((prev) => prev.filter((gynecology) => gynecology.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/gynecologie/edit/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/gynecologie/details/${id}`);
  };

  const filteredGynecologies = gynecologies.filter((gynecology) => {
    const patientId = extractIdFromUrl(gynecology.patient);
    const patient = patients.find((p) => p.id === patientId);
    const patientName = patient ? `${patient.nom} ${patient.prenom}` : "";

    return (
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(gynecology.date_consultation).toLocaleDateString().includes(searchQuery) ||
      (gynecology.date_suivi && new Date(gynecology.date_suivi).toLocaleDateString().includes(searchQuery))
    );
  });

  const sortedGynecologies = [...filteredGynecologies].sort((a, b) => {
    const dateA = new Date(a.date_consultation);
    const dateB = new Date(b.date_consultation);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="gynecology-list">
      <h2>Liste des Consultations Gynécologiques</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Rechercher par nom de patient ou date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSortToggle}>
          Trier par date ({sortOrder === "asc" ? "croissant" : "décroissant"})
        </button>
      </div>

      <ul>
        {sortedGynecologies.map((gynecology) => {
          const patientId = extractIdFromUrl(gynecology.patient);
          const patient = patients.find((p) => p.id === patientId);
          const patientName = patient ? `${patient.nom} ${patient.prenom}` : "Inconnu";

          return (
            <li key={gynecology.id}>
              <strong>Patient:</strong> {patientName} <br />
              <strong>Diagnostic:</strong> {gynecology.diagnostic} <br />
              <strong>Date de Consultation:</strong> {new Date(gynecology.date_consultation).toLocaleDateString()} <br />
              {gynecology.date_suivi && (
                <>
                  <strong>Date de Suivi:</strong> {new Date(gynecology.date_suivi).toLocaleDateString()} <br />
                </>
              )}
              <div className="action-buttons">
                <button onClick={() => handleDetails(gynecology.id)}>Voir les détails</button>
                <button onClick={() => handleDelete(gynecology.id)}>Supprimer</button>
                <button onClick={() => handleEdit(gynecology.id)}>Modifier</button>
              </div>
            </li>
          );
        })}
      </ul>

      {sortedGynecologies.length === 0 && <p>Aucune consultation trouvée.</p>}
    </div>
  );
}

export default GynecologyList;