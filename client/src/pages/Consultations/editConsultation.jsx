import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getConsultationById, updateConsultation } from "../../api/consultation";
import { getPatients } from "../../api/patient";
import { getMedecin } from "../../api/medecin";
import "../../assets/consultation.css";

function EditConsultation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient: "",
    medecin: "",
    date_consultation: "",
    diagnostique: "",
    traitement: "",
  });
  const [patients, setPatients] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [consultation, patientsData, medecinsData] = await Promise.all([
          getConsultationById(id),
          getPatients(),
          getMedecin(),
        ]);
  
        console.log("Consultation Data:", consultation);
        console.log("Patients Data:", patientsData);
        console.log("Medecins Data:", medecinsData);
  
        setPatients(patientsData);
        setMedecins(medecinsData);
  
        // Extraire l'ID des chemins relatifs de patient et medecin
        const patientId = parseInt(consultation.patient.split("/").pop());
        const medecinId = parseInt(consultation.medecin.split("/").pop());
  
        // Trouver les correspondances avec l'ID
        const patient = patientsData.find((p) => p.id === patientId);
        const medecin = medecinsData.find((m) => m.id === medecinId);
  
        console.log("Found Patient:", patient);
        console.log("Found Medecin:", medecin);
  
        setFormData({
          patient: patient ? `${patient.nom} ${patient.prenom}` : "",
          medecin: medecin ? `${medecin.nom} ${medecin.prenom}` : "",
          date_consultation: consultation.date_consultation?.split("T")[0] || "",
          diagnostique: consultation.diagnostique || "",
          traitement: consultation.traitement || "",
        });
  
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };
  
    fetchInitialData();
  }, [id]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedPatient = patients.find(
        (p) => `${p.nom} ${p.prenom}` === formData.patient
      );
      const selectedMedecin = medecins.find(
        (m) => `${m.nom} ${m.prenom}` === formData.medecin
      );

      const updatedFormData = {
        ...formData,
        patient: selectedPatient ? selectedPatient.url : formData.patient,
        medecin: selectedMedecin ? selectedMedecin.url : formData.medecin,
      };

      await updateConsultation(id, updatedFormData);
      alert("Consultation modifiée avec succès !");
      navigate("/consultations/list");
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="add-consultation">
      <h2>Modifier Consultation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient :</label>
          <input
            type="text"
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            list="patients-list"
            required
          />
          <datalist id="patients-list">
            {patients.map((patient, index) => (
              <option
                key={index}
                value={`${patient.nom} ${patient.prenom}`}
              />
            ))}
          </datalist>
        </div>
        <div>
          <label>Médecin :</label>
          <input
            type="text"
            name="medecin"
            value={formData.medecin}
            onChange={handleChange}
            list="medecins-list"
            required
          />
          <datalist id="medecins-list">
            {medecins.map((medecin, index) => (
              <option
                key={index}
                value={`${medecin.nom} ${medecin.prenom}`}
              />
            ))}
          </datalist>
        </div>
        <div>
          <label>Date Consultation :</label>
          <input
            type="date"
            name="date_consultation"
            value={formData.date_consultation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Diagnostic :</label>
          <textarea
            name="diagnostique"
            value={formData.diagnostique}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Traitement :</label>
          <textarea
            name="traitement"
            value={formData.traitement}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default EditConsultation;
