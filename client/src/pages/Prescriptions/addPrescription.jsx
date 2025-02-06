import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPrescription } from "../../api/prescription";
import { getPatients } from "../../api/patient";
import { getPharmacies } from "../../api/pharmacie";
import { getMedecin } from "../../api/medecin";
import { createMedicament } from "../../api/medicaments"; // Importer la fonction pour créer un médicament

function AddPrescription() {
  const [formData, setFormData] = useState({
    patient: "",
    date_prescription: new Date().toISOString().slice(0, 16),
    prescripteur: "",
  });

  const [medicaments, setMedicaments] = useState([]); // Liste des médicaments ajoutés
  const [currentMedicament, setCurrentMedicament] = useState({
    medicament: "",
    dose: "",
    frequence: "",
  });

  const [patients, setPatients] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [medicamentSearch, setMedicamentSearch] = useState("");
  const [prescripteurSearch, setPrescripteurSearch] = useState("");
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
  const [showMedicamentSuggestions, setShowMedicamentSuggestions] = useState(false);
  const [showPrescripteurSuggestions, setShowPrescripteurSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching patients, medecins, and pharmacies...");
        const [patientsData, medecinsData, pharmaciesData] = await Promise.all([
          getPatients(),
          getMedecin(),
          getPharmacies(),
        ]);
        console.log("Data fetched successfully:", {
          patients: patientsData,
          medecins: medecinsData,
          pharmacies: pharmaciesData,
        });
        setPatients(patientsData || []);
        setMedecins(medecinsData || []);
        setPharmacies(pharmaciesData || []);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMedicamentChange = (e) => {
    const { name, value } = e.target;
    setCurrentMedicament({ ...currentMedicament, [name]: value });
  };

  const handleAddMedicament = () => {
    if (currentMedicament.medicament && currentMedicament.dose && currentMedicament.frequence) {
      setMedicaments([...medicaments, currentMedicament]);
      setCurrentMedicament({ medicament: "", dose: "", frequence: "" }); // Réinitialiser le formulaire
    } else {
      alert("Veuillez remplir tous les champs du médicament.");
    }
  };

  const handleRemoveMedicament = (index) => {
    const updatedMedicaments = medicaments.filter((_, i) => i !== index);
    setMedicaments(updatedMedicaments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const prescriptionData = {
      ...formData,
      patient: `http://localhost:8000/api/patients/${formData.patient}`,
      prescripteur: `http://localhost:8000/api/medecins/${formData.prescripteur}`,
      medicaments: medicaments.map((med) => ({
        medicament: `http://localhost:8000/api/pharmacies/${med.medicament}`,
        dose: med.dose,
        frequence: med.frequence,
      })),
    };

    console.log("Submitting data:", prescriptionData);

    try {
      // Créer la prescription
      const prescriptionResponse = await createPrescription(prescriptionData);
      console.log("Prescription successfully created:", prescriptionResponse);

      // Ajouter les médicaments à la prescription
      for (const med of medicaments) {
        await createMedicament({
          prescription: `/api/prescription_medicaments/${prescriptionResponse.id}`, // Ajout du bon format d'URL
          medicament: `/api/pharmacies/${med.medicament}`, // Vérifie si l'ID est correct
          dose: med.dose,
          frequence: med.frequence,
      });
      medicaments.forEach((med) => {
        console.log("Envoi du médicament :", {
            prescription: `/api/prescription_medicaments/${prescriptionResponse.id}`,
            medicament: `/api/pharmacies/${med.medicament}`,
            dose: med.dose,
            frequence: med.frequence,
        });
    });
      }

      alert("Prescription ajoutée avec succès !");
      navigate("/prescriptions/list");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la prescription :", error);
      alert("Une erreur est survenue lors de l'ajout de la prescription.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectPatient = (patient) => {
    setFormData({ ...formData, patient: patient.id });
    setPatientSearch(`${patient.nom} ${patient.prenom}`);
    setShowPatientSuggestions(false);
  };

  const handleSelectMedicament = (medicament) => {
    if (medicament && medicament.id) {
      setCurrentMedicament({ ...currentMedicament, medicament: medicament.id });
      setMedicamentSearch(medicament.medicament || "");
      setShowMedicamentSuggestions(false);
    } else {
      console.error("Les données du médicament sont invalides :", medicament);
    }
  };

  const handleSelectPrescripteur = (prescripteur) => {
    setFormData({ ...formData, prescripteur: prescripteur.id });
    setPrescripteurSearch(`${prescripteur.nom} ${prescripteur.prenom}`);
    setShowPrescripteurSuggestions(false);
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.nom} ${patient.prenom}`.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const filteredMedicaments = pharmacies.filter((pharmacie) =>
    pharmacie.medicament?.toLowerCase().includes(medicamentSearch.toLowerCase())
  );

  const filteredPrescripteurs = medecins.filter((medecin) =>
    `${medecin.nom} ${medecin.prenom}`.toLowerCase().includes(prescripteurSearch.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Ajouter une prescription</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient */}
        <div>
          <label>Patient :</label>
          <input
            type="text"
            placeholder="Rechercher un patient"
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            onClick={() => setShowPatientSuggestions(true)}
          />
          {showPatientSuggestions && (
            <div className="suggestions-list">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="suggestion-item"
                  onClick={() => handleSelectPatient(patient)}
                >
                  {patient.nom} {patient.prenom}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Prescripteur */}
        <div>
          <label>Prescripteur :</label>
          <input
            type="text"
            placeholder="Rechercher un prescripteur"
            value={prescripteurSearch}
            onChange={(e) => setPrescripteurSearch(e.target.value)}
            onClick={() => setShowPrescripteurSuggestions(true)}
          />
          {showPrescripteurSuggestions && (
            <div className="suggestions-list">
              {filteredPrescripteurs.map((prescripteur) => (
                <div
                  key={prescripteur.id}
                  className="suggestion-item"
                  onClick={() => handleSelectPrescripteur(prescripteur)}
                >
                  {prescripteur.nom} {prescripteur.prenom}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Médicaments */}
        <div>
          <label>Médicaments :</label>
          <div>
            <input
              type="text"
              placeholder="Rechercher un médicament"
              value={medicamentSearch}
              onChange={(e) => setMedicamentSearch(e.target.value)}
              onClick={() => setShowMedicamentSuggestions(true)}
            />
            {showMedicamentSuggestions && (
              <div className="suggestions-list">
                {filteredMedicaments.map((medicament) => (
                  <div
                    key={medicament.id}
                    className="suggestion-item"
                    onClick={() => handleSelectMedicament(medicament)}
                  >
                    {medicament.medicament} ({medicament.stock} en stock)
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="dose"
              placeholder="Dose"
              value={currentMedicament.dose}
              onChange={handleMedicamentChange}
            />
            <input
              type="text"
              name="frequence"
              placeholder="Fréquence"
              value={currentMedicament.frequence}
              onChange={handleMedicamentChange}
            />
            <button type="button" onClick={handleAddMedicament}>
              Ajouter le médicament
            </button>
          </div>
          <div>
            {medicaments.map((med, index) => (
              <div key={index}>
                <span>{med.medicament} - {med.dose} - {med.frequence}</span>
                <button type="button" onClick={() => handleRemoveMedicament(index)}>
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Date de prescription */}
        <div>
          <label>Date de prescription :</label>
          <input
            type="datetime-local"
            name="date_prescription"
            value={formData.date_prescription}
            onChange={handleChange}
          />
        </div>

        {/* Bouton de soumission */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "En cours..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default AddPrescription;