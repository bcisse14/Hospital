import React, { useEffect, useState } from "react";
import { getPharmacies, deletePharmacie } from "../../api/pharmacie";
import { useNavigate } from "react-router-dom";

function PharmacieList() {
  const [pharmacies, setPharmacies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const data = await getPharmacies();
        setPharmacies(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des pharmacies :", error);
      }
    };
    fetchPharmacies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePharmacie(id);
      setPharmacies((prev) => prev.filter((pharmacie) => pharmacie.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/pharmacie/edit/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/pharmacie/details/${id}`);
  };

  const filteredPharmacies = pharmacies.filter((pharmacie) =>
    pharmacie.medicament.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pharmacie-list">
      <h2>Liste des Médicaments</h2>
      <input
        type="text"
        placeholder="Rechercher un médicament..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredPharmacies.map((pharmacie) => (
          <li key={pharmacie.id}>
            {pharmacie.medicament} ({pharmacie.stock} en stock)
            <div>
              <button onClick={() => handleDetails(pharmacie.id)}>Détails</button>
              <button onClick={() => handleEdit(pharmacie.id)}>Modifier</button>
              <button onClick={() => handleDelete(pharmacie.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PharmacieList;
