import React, { useEffect, useState } from "react";
import { getBiologie, deleteBiologie } from "../../api/biologie";
import { getPatients } from "../../api/patient";
import { getUsers } from "../../api/user";
import { useNavigate } from "react-router-dom";
import "../../assets/unified.css";

function BiologieList() {
  const [biologies, setBiologies] = useState([]);
  const [patients, setPatients] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [biologiesData, patientsData, techniciensData] = await Promise.all([
          getBiologie(),
          getPatients(),
          getUsers(),
        ]);

        setBiologies(biologiesData);
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
      await deleteBiologie(id);
      setBiologies((prev) => prev.filter((biologie) => biologie.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/biologie/edit/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/biologie/details/${id}`);
  };

  const filteredBiologies = biologies.filter((biologie) => {
    const patientId = extractIdFromUrl(biologie.patient);
    const technicienId = extractIdFromUrl(biologie.technicien);

    const patient = patients.find((p) => p.id === patientId);
    const technicien = techniciens.find((t) => t.id === technicienId);

    const patientName = patient ? `${patient.nom} ${patient.prenom}` : "";
    const technicienName = technicien ? `${technicien.nom} ${technicien.prenom}` : "";

    return (
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      technicienName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const sortedBiologies = [...filteredBiologies].sort((a, b) => {
    const dateA = new Date(a.date_examen);
    const dateB = new Date(b.date_examen);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="biologie-list">
      <h2>Liste des Biologies</h2>

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
        {sortedBiologies.map((biologie) => {
          const patientId = extractIdFromUrl(biologie.patient);
          const technicienId = extractIdFromUrl(biologie.technicien);

          const patient = patients.find((p) => p.id === patientId);
          const technicien = techniciens.find((t) => t.id === technicienId);

          const patientName = patient ? `${patient.nom} ${patient.prenom}` : "Inconnu";
          const technicienName = technicien ? `${technicien.nom} ${technicien.prenom}` : "Inconnu";

          return (
            <li key={biologie.id}>
              <strong>Patient:</strong> {patientName} <br />
              <strong>Technicien:</strong> {technicienName} <br />
              <strong>Date:</strong>{" "}
              {new Date(biologie.date_examen).toLocaleDateString()}
              <div className="action-buttons">
                <button onClick={() => handleDetails(biologie.id)}>Voir les détails</button>
                <button onClick={() => handleDelete(biologie.id)}>Supprimer</button>
                <button onClick={() => handleEdit(biologie.id)}>Modifier</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BiologieList;