import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGynecologyById } from "../../api/gynecologie";
import { getPatientById } from "../../api/patient";

function GynecologyDetails() {
  const { id } = useParams();
  const [gynecologyDetails, setGynecologyDetails] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const gynecology = await getGynecologyById(id);
      const patient = await getPatientById(gynecology.patient.split("/").pop());
      setGynecologyDetails(gynecology);
      setPatientDetails(patient);
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      setError("Une erreur est survenue lors du chargement des données.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Détails de la Consultation Gynécologique</h1>

      {gynecologyDetails ? (
        <div>
          <div>
            <strong>Patient :</strong> {patientDetails ? `${patientDetails.nom} ${patientDetails.prenom}` : "Inconnu"}
          </div>
          <div>
            <strong>Date de Consultation :</strong> {new Date(gynecologyDetails.date_consultation).toLocaleDateString()}
          </div>
          <div>
            <strong>Diagnostic :</strong> {gynecologyDetails.diagnostic}
          </div>
          <div>
            <strong>Plan de Traitement :</strong> {gynecologyDetails.plan_traitement}
          </div>
          <div>
            <strong>Date de Suivi :</strong> {new Date(gynecologyDetails.date_suivi).toLocaleDateString()}
          </div>
        </div>
      ) : (
        <p>Aucune donnée disponible pour cette consultation.</p>
      )}
    </div>
  );
}

export default GynecologyDetails;