import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPrescriptionById, updatePrescription } from "../../api/prescription";
import { getPatientById, getPatients } from "../../api/patient";
import { getMedecinById, getMedecin } from "../../api/medecin";
import { getMedicamentById, createMedicament, updateMedicament, deleteMedicament } from "../../api/medicaments";
import { getPharmacies, getPharmacieById } from "../../api/pharmacie";

function EditPrescription() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patient: "",
    prescripteur: "",
  });

  const [medicaments, setMedicaments] = useState([]);
  const [currentMedicament, setCurrentMedicament] = useState({
    medicament: "",
    dose: "",
    frequence: "",
  });

  const [patientDetails, setPatientDetails] = useState(null);
  const [prescripteurDetails, setPrescripteurDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [patientSuggestions, setPatientSuggestions] = useState([]);
  const [medecinSuggestions, setMedecinSuggestions] = useState([]);
  const [medicamentSuggestions, setMedicamentSuggestions] = useState([]);

  const [patientSearch, setPatientSearch] = useState("");
  const [prescripteurSearch, setPrescripteurSearch] = useState("");
  const [medicamentSearch, setMedicamentSearch] = useState("");
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
  const [showPrescripteurSuggestions, setShowPrescripteurSuggestions] = useState(false);
  const [showMedicamentSuggestions, setShowMedicamentSuggestions] = useState(false);

  const [patients, setPatients] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prescription = await getPrescriptionById(id);

        const patientId = prescription.patient.split("/").pop();
        const patient = await getPatientById(patientId);
        setPatientDetails(patient);
        setPatientSearch(`${patient.nom} ${patient.prenom}`);

        const prescripteurId = prescription.prescripteur.split("/").pop();
        const prescripteur = await getMedecinById(prescripteurId);
        setPrescripteurDetails(prescripteur);
        setPrescripteurSearch(`${prescripteur.nom} ${prescripteur.prenom}`);

        const medicamentsData = await Promise.all(
          prescription.medicamentsPrescrits.map(async (medicamentUrl) => {
            const medicamentId = medicamentUrl.split("/").pop();
            const medicamentPrescrit = await getMedicamentById(medicamentId);
            const medicamentDetails = await getPharmacieById(medicamentPrescrit.medicament.split("/").pop());
            return { ...medicamentPrescrit, medicamentNom: medicamentDetails.medicament };
          })
        );

        setFormData({
          patient: patientId,
          prescripteur: prescripteurId,
        });

        setMedicaments(medicamentsData);

        const [fetchedPatients, fetchedMedecins, fetchedPharmacies] = await Promise.all([
          getPatients(),
          getMedecin(),
          getPharmacies(),
        ]);
        setPatients(fetchedPatients);
        setMedecins(fetchedMedecins);
        setPharmacies(fetchedPharmacies);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "patient") {
      setPatientSearch(value);
      setShowPatientSuggestions(true);
    } else if (name === "prescripteur") {
      setPrescripteurSearch(value);
      setShowPrescripteurSuggestions(true);
    }
  };

  const handleMedicamentChange = (e) => {
    const { name, value } = e.target;
    setCurrentMedicament({ ...currentMedicament, [name]: value });

    if (name === "medicament") {
      setMedicamentSearch(value);
      setShowMedicamentSuggestions(true);
    }
  };

  const handleAddMedicament = async () => {
    if (currentMedicament.medicament && currentMedicament.dose && currentMedicament.frequence) {
      try {
        const newMedicamentData = {
          medicament: `/api/pharmacies/${currentMedicament.medicament}`,
          dose: currentMedicament.dose,
          frequence: currentMedicament.frequence,
          prescription: `/api/prescription_medicaments/${id}`,
        };
        console.log("Sending new medicament data:", newMedicamentData);
        const newMedicament = await createMedicament(newMedicamentData);
        const medicamentDetails = await getPharmacieById(newMedicament.medicament.split("/").pop());
        setMedicaments([...medicaments, { ...newMedicament, medicamentNom: medicamentDetails.medicament }]);
        setCurrentMedicament({ medicament: "", dose: "", frequence: "" });
      } catch (error) {
        console.error("Erreur lors de l'ajout du médicament :", error);
        alert("Une erreur est survenue lors de l'ajout du médicament.");
      }
    } else {
      alert("Veuillez remplir tous les champs du médicament.");
    }
  };

  const handleRemoveMedicament = async (index) => {
    const medicamentToDelete = medicaments[index];
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce médicament ?")) {
      try {
        await deleteMedicament(medicamentToDelete.id);
        const updatedMedicaments = medicaments.filter((_, i) => i !== index);
        setMedicaments(updatedMedicaments);
      } catch (error) {
        console.error("Erreur lors de la suppression du médicament :", error);
        alert("Une erreur est survenue lors de la suppression du médicament.");
      }
    }
  };

  const handleUpdateMedicament = async (index) => {
    const medicamentToUpdate = medicaments[index];
    if (medicamentToUpdate.medicament && medicamentToUpdate.dose && medicamentToUpdate.frequence) {
      try {
        const updatedMedicamentData = {
          medicament: medicamentToUpdate.medicament,
          dose: medicamentToUpdate.dose,
          frequence: medicamentToUpdate.frequence,
        };
        console.log("Updating medicament data:", updatedMedicamentData);
        const updatedMedicament = await updateMedicament(medicamentToUpdate.id, updatedMedicamentData);
        const medicamentDetails = await getPharmacieById(updatedMedicament.medicament.split("/").pop());
        const updatedMedicaments = [...medicaments];
        updatedMedicaments[index] = { ...updatedMedicament, medicamentNom: medicamentDetails.medicament };
        setMedicaments(updatedMedicaments);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du médicament :", error);
        alert("Une erreur est survenue lors de la mise à jour du médicament.");
      }
    } else {
      alert("Veuillez remplir tous les champs du médicament.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const prescriptionData = {
      ...formData,
      patient: `http://localhost:8000/api/patients/${formData.patient}`,
      prescripteur: `http://localhost:8000/api/medecins/${formData.prescripteur}`,
      medicaments: medicaments.map((med) => ({
        medicament: med.medicament,
        dose: med.dose,
        frequence: med.frequence,
      })),
      date_prescription: new Date().toISOString(),
    };

    try {
      console.log("Updating prescription data:", prescriptionData);
      await updatePrescription(id, prescriptionData);
      alert("Prescription mise à jour avec succès !");
      navigate("/prescriptions/list");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la prescription :", error);
      alert("Une erreur est survenue lors de la mise à jour de la prescription.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.nom} ${patient.prenom}`.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const filteredPrescripteurs = medecins.filter((medecin) =>
    `${medecin.nom} ${medecin.prenom}`.toLowerCase().includes(prescripteurSearch.toLowerCase())
  );

  const filteredMedicaments = pharmacies.filter((pharmacie) =>
    pharmacie.medicament.toLowerCase().includes(medicamentSearch.toLowerCase())
  );

  const handleSelectPatient = (patient) => {
    setFormData({ ...formData, patient: patient.id });
    setPatientSearch(`${patient.nom} ${patient.prenom}`);
    setShowPatientSuggestions(false);
  };

  const handleSelectPrescripteur = (prescripteur) => {
    setFormData({ ...formData, prescripteur: prescripteur.id });
    setPrescripteurSearch(`${prescripteur.nom} ${prescripteur.prenom}`);
    setShowPrescripteurSuggestions(false);
  };

  const handleSelectMedicament = (medicament) => {
    setCurrentMedicament({ ...currentMedicament, medicament: medicament.id });
    setMedicamentSearch(medicament.medicament);
    setShowMedicamentSuggestions(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Modifier une prescription</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label>Médicaments :</label>
          <div>
            {medicaments.map((med, index) => (
              <div key={index}>
                <span>
                  {med.medicamentNom} - {med.dose} - {med.frequence}
                </span>
                <button type="button" onClick={() => handleUpdateMedicament(index)}>
                  Modifier
                </button>
                <button type="button" onClick={() => handleRemoveMedicament(index)}>
                  Supprimer
                </button>
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              name="medicament"
              placeholder="Nom du médicament"
              value={medicamentSearch}
              onChange={handleMedicamentChange}
              onClick={() => setShowMedicamentSuggestions(true)}
              list="medicamentSuggestions"
            />
            {showMedicamentSuggestions && (
              <div className="suggestions-list">
                {filteredMedicaments.map((medicament) => (
                  <div
                    key={medicament.id}
                    className="suggestion-item"
                    onClick={() => handleSelectMedicament(medicament)}
                  >
                    {medicament.medicament}
                  </div>
                ))}
              </div>
            )}
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
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "En cours..." : "Mettre à jour"}
        </button>
      </form>
    </div>
  );
}

export default EditPrescription;