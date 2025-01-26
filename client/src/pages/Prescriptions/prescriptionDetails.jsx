import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPrescriptionById } from "../../api/prescription";

function PrescriptionDetails() {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const data = await getPrescriptionById(id);
        setPrescription(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la prescription :", error);
      }
    };

    fetchPrescription();
  }, [id]);

  if (!prescription) {
    return <p>Chargement des détails de la prescription...</p>;
  }

  return (
    <div className="prescription-details">
      <h2>Détails de la Prescription</h2>
      <p><strong>Patient :</strong> {prescription.patient}</p>
      <p><strong>Médicament :</strong> {prescription.medicament}</p>
      <p><strong>Dose :</strong> {prescription.dose}</p>
      <p><strong>Fréquence :</strong> {prescription.frequence}</p>
      <p><strong>Date de Prescription :</strong> {new Date(prescription.datePrescription).toLocaleString()}</p>
      <p><strong>Prescripteur :</strong> {prescription.prescripteur}</p>
    </div>
  );
}

export default PrescriptionDetails;
