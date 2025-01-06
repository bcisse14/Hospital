import React, { useEffect, useState } from "react";
import { getPatients, deletePatient } from "../api/patient";
import { useNavigate } from "react-router-dom";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatients();
      setPatients(data);
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

  return (
    <div className="patient-list">
      <h2>Liste des Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.nom} {patient.prenom} ({calculateAge(patient.date_naissance)} ans)
            <button onClick={() => handleDelete(patient.id)}>Supprimer</button>
            <button onClick={() => handleEdit(patient.id)}>Modifier</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;
