import React, { useEffect, useState } from "react";
import { getHospitalisations, deleteHospitalisation } from "../../api/hospitalisation";
import { getPatients } from "../../api/patient";
import { useNavigate } from "react-router-dom";

function HospitalisationList() {
  const [hospitalisations, setHospitalisations] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entryDateFilter, setEntryDateFilter] = useState("");
  const [exitDateFilter, setExitDateFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hospitalisationsData, patientsData] = await Promise.all([
          getHospitalisations(),
          getPatients(),
        ]);
        setHospitalisations(hospitalisationsData);
        setPatients(patientsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteHospitalisation(id);
      setHospitalisations((prev) => prev.filter((h) => h.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/hospitalisations/edit/${id}`);
  };
  const handleDetails = (id) => {
    navigate(`/hospitalisations/details/${id}`);
  };

  const filteredHospitalisations = hospitalisations.filter((hospitalisation) => {
    const patientId =
      typeof hospitalisation.patient === "string"
        ? parseInt(hospitalisation.patient.split("/").pop(), 10)
        : hospitalisation.patient.id;

    const patient = patients.find((p) => p.id === patientId);

    const patientName = patient ? `${patient.nom} ${patient.prenom}`.toLowerCase() : "";
    const room = hospitalisation.chambre?.toString().toLowerCase();

    const matchesQuery =
      searchQuery === "" ||
      patientName.includes(searchQuery.toLowerCase()) ||
      room.includes(searchQuery.toLowerCase());

    const entryDate = hospitalisation.date_entree?.split("T")[0];
    const exitDate = hospitalisation.date_sortie?.split("T")[0];

    const matchesEntryDate = entryDateFilter ? entryDate === entryDateFilter : true;
    const matchesExitDate = exitDateFilter ? exitDate === exitDateFilter : true;

    return matchesQuery && matchesEntryDate && matchesExitDate;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="hospitalisation-list">
      <h2>Liste des Hospitalisations</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher par patient ou chambre"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div>
          <label>Filtrer par date d'entrée :</label>
          <input
            type="date"
            value={entryDateFilter}
            onChange={(e) => setEntryDateFilter(e.target.value)}
          />
        </div>

        <div>
          <label>Filtrer par date de sortie :</label>
          <input
            type="date"
            value={exitDateFilter}
            onChange={(e) => setExitDateFilter(e.target.value)}
          />
        </div>
      </div>

      <ul>
        {filteredHospitalisations.map((hospitalisation) => {
          const patientId =
            typeof hospitalisation.patient === "string"
              ? parseInt(hospitalisation.patient.split("/").pop(), 10)
              : hospitalisation.patient.id;

          const patient = patients.find((p) => p.id === patientId);

          const patientName = patient ? `${patient.nom} ${patient.prenom}` : "Inconnu";

          return (
            <li key={hospitalisation.id}>
              <div>
                Patient: {patientName}, Chambre: {hospitalisation.chambre} <br />
                Date d'entrée: {new Date(hospitalisation.date_entree).toLocaleDateString()} <br />
                Date de sortie: {hospitalisation.date_sortie ? new Date(hospitalisation.date_sortie).toLocaleDateString() : "Non spécifiée"}
              </div>
              <div className="action-buttons">
              <button onClick={() => handleDetails(hospitalisation.id)}>
                  Voir les détails
                </button>
                <button onClick={() => handleDelete(hospitalisation.id)}>
                  Supprimer
                </button>
                <button onClick={() => handleEdit(hospitalisation.id)}>
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

export default HospitalisationList;