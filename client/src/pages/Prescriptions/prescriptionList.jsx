import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPrescription, deletePrescription } from "../../api/prescription";

function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await getPrescription();
        setPrescriptions(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des prescriptions :", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePrescription(id);
      setPrescriptions((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la prescription :", error);
    }
  };

  return (
    <div className="prescription-list">
      <h2>Liste des Prescriptions</h2>
      <Link to="/prescription/add">Ajouter une Prescription</Link>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription.id}>
            <Link to={`/prescription/${prescription.id}`}>
              Prescription {prescription.id}
            </Link>
            <button onClick={() => handleDelete(prescription.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrescriptionList;
