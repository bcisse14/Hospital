import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRadiologieById, updateRadiologie } from "../../api/radiologie";
import { getPatients } from "../../api/patient";
import { getUsers } from "../../api/user";
import "../../assets/consultation.css";

function EditRadiologie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient: "",
    type_examen: "",
    date_examen: "",
    resultat: "",
    technicien: "",
    images: "",
  });
  const [patients, setPatients] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [radiologie, patientsData, techniciensData] = await Promise.all([
          getRadiologieById(id),
          getPatients(),
          getUsers(),
        ]);

        setPatients(patientsData);
        setTechniciens(techniciensData);

        const patientId = parseInt(radiologie.patient.split("/").pop());
        const technicienId = parseInt(radiologie.technicien.split("/").pop());

        const patient = patientsData.find((p) => p.id === patientId);
        const technicien = techniciensData.find((t) => t.id === technicienId);

        setFormData({
          patient: patient ? `${patient.nom} ${patient.prenom}` : "",
          type_examen: radiologie.type_examen || "",
          date_examen: radiologie.date_examen?.split("T")[0] || "",
          resultat: radiologie.resultat || "",
          technicien: technicien ? `${technicien.nom} ${technicien.prenom}` : "",
          images: radiologie.images || "",
        });

        setFileName(radiologie.images ? `Image existante` : '');

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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFormData({ ...formData, images: base64 });
    setFileName(file.name);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedPatient = patients.find(
        (p) => `${p.nom} ${p.prenom}` === formData.patient
      );
      const selectedTechnicien = techniciens.find(
        (t) => `${t.nom} ${t.prenom}` === formData.technicien
      );

      const updatedFormData = {
        ...formData,
        patient: selectedPatient ? selectedPatient.url : formData.patient,
        technicien: selectedTechnicien ? selectedTechnicien.url : formData.technicien,
      };

      await updateRadiologie(id, updatedFormData);
      alert("Radiologie modifiée avec succès !");
      navigate("/radiologies/list");
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="add-radiologie">
      <h2>Modifier Radiologie</h2>
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
              <option key={index} value={`${patient.nom} ${patient.prenom}`} />
            ))}
          </datalist>
        </div>
        <div>
          <label>Type d'examen :</label>
          <input
            type="text"
            name="type_examen"
            value={formData.type_examen}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date Examen :</label>
          <input
            type="date"
            name="date_examen"
            value={formData.date_examen}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Résultat :</label>
          <textarea
            name="resultat"
            value={formData.resultat}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Technicien :</label>
          <input
            type="text"
            name="technicien"
            value={formData.technicien}
            onChange={handleChange}
            list="techniciens-list"
            required
          />
          <datalist id="techniciens-list">
            {techniciens.map((technicien, index) => (
              <option key={index} value={`${technicien.nom} ${technicien.prenom}`} />
            ))}
          </datalist>
        </div>
        <div>
          <label>Images :</label>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
          />
          {fileName && <p>Fichier actuel : {fileName}</p>}
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default EditRadiologie;