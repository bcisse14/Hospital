import React, { useEffect, useState } from "react";
import { getMedecin, deleteMedecin } from "../../api/medecin";
import { useNavigate } from "react-router-dom";
import "../../assets/unified.css";

function MedecinList() {
  const [medecins, setMedecins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedecins = async () => {
      try {
        const data = await getMedecin();
        setMedecins(data);

        // Extraire les spécialités uniques
        const uniqueSpecialties = [...new Set(data.map((medecin) => medecin.specialite))];
        setSpecialties(uniqueSpecialties);
      } catch (error) {
        console.error("Erreur lors de la récupération des médecins :", error);
      }
    };
    fetchMedecins();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMedecin(id);
      setMedecins((prev) => prev.filter((medecin) => medecin.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/medecins/edit/${id}`);
  };
  const handleDetails = (id) => {
    navigate(`/medecins/details/${id}`);
  };
  // Filtrage des médecins en fonction de la recherche et de la spécialité
  const filteredMedecins = medecins.filter((medecin) => {
    const matchesSearch = `${medecin.nom} ${medecin.prenom}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      !selectedSpecialty || medecin.specialite === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="medecin-list">
      <h2>Liste des Médecins</h2>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un médecin..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Sélection de spécialité */}
      <select
        value={selectedSpecialty}
        onChange={(e) => setSelectedSpecialty(e.target.value)}
        className="specialty-select"
      >
        <option value="">Toutes les spécialités</option>
        {specialties.map((specialty) => (
          <option key={specialty} value={specialty}>
            {specialty}
          </option>
        ))}
      </select>

      {/* Liste des médecins */}
      <ul>
        {filteredMedecins.map((medecin) => (
          <li key={medecin.id}>
            {medecin.nom} {medecin.prenom} ({medecin.specialite})
            <div className="action-buttons">
            <button onClick={() => handleDetails(medecin.id)}>
                  Voir les détails
                </button>
              <button onClick={() => handleDelete(medecin.id)}>Supprimer</button>
              <button onClick={() => handleEdit(medecin.id)}>Modifier</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Message si aucun résultat */}
      {filteredMedecins.length === 0 && <p>Aucun médecin trouvé.</p>}
    </div>
  );
}

export default MedecinList;
