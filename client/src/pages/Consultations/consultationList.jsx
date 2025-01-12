import React, { useEffect, useState } from "react";
import { getConsultations, deleteConsultation } from "../../api/consultation";
import { getPatients } from "../../api/patient";
import { getMedecin } from "../../api/medecin";
import { useNavigate } from "react-router-dom";
import "../../assets/unified.css";

function ConsultationList() {
  const [consultations, setConsultations] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [consultationsData, patientsData, medecinsData] = await Promise.all([
          getConsultations(),
          getPatients(),
          getMedecin(),
        ]);

        setConsultations(consultationsData);
        setPatients(patientsData);
        setMedecins(medecinsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  const extractIdFromUrl = (url) => parseInt(url.split("/").pop(), 10);

  const handleDelete = async (id) => {
    try {
      await deleteConsultation(id);
      setConsultations((prev) => prev.filter((consultation) => consultation.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/consultations/edit/${id}`);
  };

  const filteredConsultations = consultations.filter((consultation) => {
    const patientId = extractIdFromUrl(consultation.patient);
    const medecinId = extractIdFromUrl(consultation.medecin);

    const patient = patients.find((p) => p.id === patientId);
    const medecin = medecins.find((m) => m.id === medecinId);

    const patientName = patient ? `${patient.nom} ${patient.prenom}` : "";
    const medecinName = medecin ? `${medecin.nom} ${medecin.prenom}` : "";

    return (
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medecinName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const sortedConsultations = [...filteredConsultations].sort((a, b) => {
    const dateA = new Date(a.date_consultation);
    const dateB = new Date(b.date_consultation);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="consultation-list">
      <h2>Liste des Consultations</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Rechercher par nom de patient ou médecin"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSortToggle}>
          Trier par date ({sortOrder === "asc" ? "croissant" : "décroissant"})
        </button>
      </div>

      <ul>
        {sortedConsultations.map((consultation) => {
          const patientId = extractIdFromUrl(consultation.patient);
          const medecinId = extractIdFromUrl(consultation.medecin);

          const patient = patients.find((p) => p.id === patientId);
          const medecin = medecins.find((m) => m.id === medecinId);

          const patientName = patient ? `${patient.nom} ${patient.prenom}` : "Inconnu";
          const medecinName = medecin ? `${medecin.nom} ${medecin.prenom}` : "Inconnu";

          return (
            <li key={consultation.id}>
              <strong>Patient:</strong> {patientName} <br />
              <strong>Médecin:</strong> {medecinName} <br />
              <strong>Date:</strong>{" "}
              {new Date(consultation.date_consultation).toLocaleDateString()}
              <div className="action-buttons">
                <button onClick={() => handleDelete(consultation.id)}>Supprimer</button>
                <button onClick={() => handleEdit(consultation.id)}>Modifier</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ConsultationList;
