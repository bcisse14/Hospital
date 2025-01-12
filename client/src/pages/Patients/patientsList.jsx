import React, { useEffect, useState } from "react";
import { getPatients, deletePatient } from "../../api/patient";
import { useNavigate } from "react-router-dom";
import "../../assets/unified.css";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sexes, setSexes] = useState([]);
  const [selectedSex, setSelectedSex] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);

        // Extraire les sexes uniques (ou tout autre critère de tri)
        const uniqueSexes = [...new Set(data.map((patient) => patient.sexe))];
        setSexes(uniqueSexes);
      } catch (error) {
        console.error("Erreur lors de la récupération des patients :", error);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/patients/edit/${id}`);
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Filtrage des patients en fonction de la recherche et du sexe
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = `${patient.nom} ${patient.prenom}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSex = !selectedSex || patient.sexe === selectedSex;
    return matchesSearch && matchesSex;
  });

  return (
    <div className="patient-list">
      <h2>Liste des Patients</h2>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un patient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Sélection par sexe */}
      <select
        value={selectedSex}
        onChange={(e) => setSelectedSex(e.target.value)}
        className="sex-select"
      >
        <option value="">Tous les sexes</option>
        {sexes.map((sex) => (
          <option key={sex} value={sex}>
            {sex}
          </option>
        ))}
      </select>

      {/* Liste des patients */}
      <ul>
        {filteredPatients.map((patient) => (
          <li key={patient.id}>
            {patient.nom} {patient.prenom} ({calculateAge(patient.date_naissance)} ans, {patient.sexe})
            <div className="action-buttons">
              <button onClick={() => handleDelete(patient.id)}>Supprimer</button>
              <button onClick={() => handleEdit(patient.id)}>Modifier</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Message si aucun résultat */}
      {filteredPatients.length === 0 && <p>Aucun patient trouvé.</p>}
    </div>
  );
}

export default PatientList;
