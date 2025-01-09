import React, { useEffect, useState } from "react";
import { getMedecin, deleteMedecin } from "../../api/medecin";
import { useNavigate } from "react-router-dom";

function MedecinList() {
  const [medecins, setMedecins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedecins = async () => {
      try {
        const data = await getMedecin();
        setMedecins(data);
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

  return (
    <div className="medecin-list">
      <h2>Liste des Médecins</h2>
      <ul>
        {medecins.map((medecin) => (
          <li key={medecin.id}>
            {medecin.nom} {medecin.prenom} ({medecin.specialite})
            <button onClick={() => handleDelete(medecin.id)}>Supprimer</button>
            <button onClick={() => handleEdit(medecin.id)}>Modifier</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedecinList;
