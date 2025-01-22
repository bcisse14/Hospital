import React, { useEffect, useState } from "react";
import { getRendezvous, deleteRendezvous } from "../../api/rendezVous";
import { getPatients } from "../../api/patient";
import { getMedecin } from "../../api/medecin";
import { useNavigate } from "react-router-dom";

function RendezVousList() {
  const [rendezVousList, setRendezVousList] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // Nouveau filtre par statut
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rendezVousData, patientsData, medecinsData] = await Promise.all([
          getRendezvous(),
          getPatients(),
          getMedecin(),
        ]);

        setRendezVousList(rendezVousData);
        setPatients(patientsData);
        setMedecins(medecinsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRendezvous(id);
      setRendezVousList((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/rendezvous/edit/${id}`);
  };
  const handleDetails = (id) => {
    navigate(`/rendezvous/details/${id}`);
  };
  

  const filteredRendezVous = rendezVousList.filter((rendezVous) => {
    const patientId =
      typeof rendezVous.patient === "string"
        ? parseInt(rendezVous.patient.split("/").pop(), 10)
        : rendezVous.patient.id;

    const medecinId =
      typeof rendezVous.medecin === "string"
        ? parseInt(rendezVous.medecin.split("/").pop(), 10)
        : rendezVous.medecin.id;

    const patient = patients.find((p) => p.id === patientId);
    const medecin = medecins.find((m) => m.id === medecinId);

    const patientName = patient ? `${patient.nom} ${patient.prenom}`.toLowerCase() : "";
    const medecinName = medecin ? `${medecin.nom} ${medecin.prenom}`.toLowerCase() : "";

    const matchesQuery =
      searchQuery === "" ||
      patientName.includes(searchQuery.toLowerCase()) ||
      medecinName.includes(searchQuery.toLowerCase());

    const rendezVousDate = rendezVous.dateRendezvous?.split("T")[0];
    const matchesDate = dateFilter ? rendezVousDate === dateFilter : true;

    const matchesStatus =
      statusFilter === "" || rendezVous.statut === statusFilter;

    return matchesQuery && matchesDate && matchesStatus;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="rendezvous-list">
      <h2>Liste des Rendez-vous</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher par patient ou médecin"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div>
          <label>Filtrer par date :</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        <div>
          <label>Filtrer par statut :</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tous</option>
            <option value="en_attente">En attente</option>
            <option value="annulé">Annulé</option>
            <option value="confirmé">Confirmé</option>
          </select>
        </div>
      </div>

      <ul>
        {filteredRendezVous.map((rendezVous) => {
          const patientId =
            typeof rendezVous.patient === "string"
              ? parseInt(rendezVous.patient.split("/").pop(), 10)
              : rendezVous.patient.id;

          const medecinId =
            typeof rendezVous.medecin === "string"
              ? parseInt(rendezVous.medecin.split("/").pop(), 10)
              : rendezVous.medecin.id;

          const patient = patients.find((p) => p.id === patientId);
          const medecin = medecins.find((m) => m.id === medecinId);

          const patientName = patient ? `${patient.nom} ${patient.prenom}` : "Inconnu";
          const medecinName = medecin ? `${medecin.nom} ${medecin.prenom}` : "Inconnu";

          let formattedDate = "Date non spécifiée";
          let formattedTime = "Heure non spécifiée";

          if (rendezVous.dateRendezvous) {
            const date = new Date(rendezVous.dateRendezvous);

            if (!isNaN(date.getTime())) {
              formattedDate = date.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              formattedTime = date.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              });
            }
          }

          return (
            <li key={rendezVous.id}>
              <div>
                Patient: {patientName}, Médecin: {medecinName} <br />
                Date: {formattedDate} <br />
                Heure: {formattedTime} <br />
                Statut: {rendezVous.statut}
              </div>
              <div className="action-buttons">
                <button onClick={() => handleDetails(rendezVous.id)}>
                  Voir les détails
                </button>
                <button onClick={() => handleDelete(rendezVous.id)}>
                  Supprimer
                </button>
                <button onClick={() => handleEdit(rendezVous.id)}>
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

export default RendezVousList;
