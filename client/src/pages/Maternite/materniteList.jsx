import React, { useEffect, useState } from "react";
import { getMaternite, deleteMaternite } from "../../api/maternite";
import { getPatients } from "../../api/patient";
import { useNavigate } from "react-router-dom";
import "../../assets/unified.css";

function MaterniteList() {
  const [maternite, setMaternites] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [maternitesData, patientsData] = await Promise.all([
          getMaternite(),
          getPatients(),
        ]);

        setMaternites(maternitesData);
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
      await deleteMaternite(id);
      setMaternites((prev) => prev.filter((maternite) => maternite.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/maternite/edit/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/maternite/details/${id}`);
  };

  const filteredMaternites = maternite.filter((maternite) => {
    const mereId = extractIdFromUrl(maternite.mere);
    const bebeIds = maternite.bebes.map((bebeUrl) => extractIdFromUrl(bebeUrl));

    const mere = patients.find((p) => p.id === mereId);
    const bebes = bebeIds.map((bebeId) => patients.find((p) => p.id === bebeId));

    const mereName = mere ? `${mere.nom} ${mere.prenom}` : "";
    const bebeNames = bebes.map((bebe) => bebe ? `${bebe.nom} ${bebe.prenom}` : "").join(", ");

    return (
      mereName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bebeNames.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const sortedMaternites = [...filteredMaternites].sort((a, b) => {
    const dateA = new Date(a.date_accouchement);
    const dateB = new Date(b.date_accouchement);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="maternite-list">
      <h2>Liste des Maternités</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Rechercher par nom de mère ou de bébé"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSortToggle}>
          Trier par date ({sortOrder === "asc" ? "croissant" : "décroissant"})
        </button>
      </div>

      <ul>
        {sortedMaternites.map((maternite) => {
          const mereId = extractIdFromUrl(maternite.mere);
          const bebeIds = maternite.bebes.map((bebeUrl) => extractIdFromUrl(bebeUrl));

          const mere = patients.find((p) => p.id === mereId);
          const bebes = bebeIds.map((bebeId) => patients.find((p) => p.id === bebeId));

          const mereName = mere ? `${mere.nom} ${mere.prenom}` : "Inconnu";
          const bebeNames = bebes.map((bebe) => bebe ? `${bebe.nom} ${bebe.prenom}` : "Inconnu").join(", ");

          return (
            <li key={maternite.id}>
              <strong>Mère:</strong> {mereName} <br />
              <strong>Bébé(s):</strong> {bebeNames} <br />
              <strong>Date d'Accouchement:</strong>{" "}
              {new Date(maternite.date_accouchement).toLocaleDateString()}
              <div className="action-buttons">
                <button onClick={() => handleDetails(maternite.id)}>Voir les détails</button>
                <button onClick={() => handleDelete(maternite.id)}>Supprimer</button>
                <button onClick={() => handleEdit(maternite.id)}>Modifier</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MaterniteList;