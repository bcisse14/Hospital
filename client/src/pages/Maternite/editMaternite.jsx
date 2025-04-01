import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getMaterniteById, updateMaternite } from "../../api/maternite";
import { getPatients, createPatient, getPatientById } from "../../api/patient";
import "../../assets/consultation.css";

function EditMaternite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, control, watch } = useForm();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "bebes",
  });
  const [meres, setMeres] = useState([]);
  const [mereSearch, setMereSearch] = useState("");
  const [showMereSuggestions, setShowMereSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Récupérer les données de la maternité et des patients
        const [maternite, patientsData] = await Promise.all([
          getMaterniteById(id),
          getPatients(),
        ]);

        console.log("Maternité récupérée :", maternite);
        console.log("Patients récupérés :", patientsData);

        setMeres(patientsData);

        // Récupérer les informations de la mère
        const mereId = parseInt(maternite.mere.split("/").pop());
        const mere = patientsData.find((p) => p.id === mereId);

        // Pré-remplir les informations de la mère
        setValue("mere", mereId);
        setValue("mere_num_secu_social", mere?.num_secu_social || "");
        setValue("mere_adresse", mere?.adresse || "");
        setValue("mere_telephone", mere?.telephone || "");
        setMereSearch(mere ? `${mere.nom} ${mere.prenom}` : "");

        // Pré-remplir les informations de la maternité
        const formattedDate = maternite.date_accouchement
          ? new Date(maternite.date_accouchement).toISOString().slice(0, 16)
          : "";
        setValue("date_accouchement", formattedDate);
        setValue("type_accouchement", maternite.type_accouchement || "");
        setValue("notes", maternite.notes || "");

        // Récupérer les informations des bébés
        const patientIds = maternite.patients.map((patientUrl) =>
          parseInt(patientUrl.split("/").pop())
        );
        const patientsDetails = await Promise.all(
          patientIds.map((patientId) => getPatientById(patientId))
        );

        console.log("Détails des bébés récupérés :", patientsDetails);

        // Injecter les informations des bébés dans le formulaire
        replace(
          patientsDetails.map((bebe) => ({
            id: bebe.id,
            nom: bebe.nom,
            prenom: bebe.prenom,
            sexe: bebe.sexe === "Homme" ? "M" : "F",
            num_secu_social: bebe.num_secu_social,
            adresse: bebe.adresse,
            telephone: bebe.telephone,
            isExisting: true, // Marquer comme existant
          }))
        );

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [id, setValue, replace]);

  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", data);

      // Traiter les bébés nouveaux et existants
      const patients = await Promise.all(
        data.bebes.map(async (bebeData) => {
          if (bebeData.isExisting) {
            // Si le bébé existe déjà, retourner son ID
            return `/api/patients/${bebeData.id}`;
          }

          // Sinon, créer un nouveau patient
          const newPatient = {
            nom: bebeData.nom,
            prenom: bebeData.prenom,
            date_naissance: data.date_accouchement,
            adresse: data.mere_adresse,
            telephone: data.mere_telephone,
            num_secu_social: data.mere_num_secu_social,
            sexe: bebeData.sexe === "M" ? "Homme" : "Femme",
            date_enregistrement: new Date().toISOString(),
          };

          const createdPatient = await createPatient(newPatient);
          return `/api/patients/${createdPatient.id}`;
        })
      );

      const updatedData = {
        mere: `/api/patients/${data.mere}`,
        patients: patients,
        date_accouchement: data.date_accouchement,
        type_accouchement: data.type_accouchement,
        notes: data.notes,
      };

      await updateMaternite(id, updatedData);
      alert("Maternité modifiée avec succès !");
      navigate("/maternite/list");
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  const filteredMeres = meres.filter((mere) =>
    `${mere.nom} ${mere.prenom}`.toLowerCase().includes(mereSearch.toLowerCase())
  );

  const handleSelectMere = (mere) => {
    setValue("mere", mere.id);
    setValue("mere_num_secu_social", mere.num_secu_social);
    setValue("mere_adresse", mere.adresse);
    setValue("mere_telephone", mere.telephone);
    setMereSearch(`${mere.nom} ${mere.prenom}`);
    setShowMereSuggestions(false);
  };

  const mereNumSecuSocial = watch("mere_num_secu_social");
  const mereAdresse = watch("mere_adresse");
  const mereTelephone = watch("mere_telephone");

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="edit-maternite">
      <h2>Modifier Maternité</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Mère :</label>
          <input
            type="text"
            placeholder="Rechercher une mère"
            value={mereSearch}
            onChange={(e) => setMereSearch(e.target.value)}
            onClick={() => setShowMereSuggestions(true)}
          />
          {showMereSuggestions && (
            <div className="suggestions-list">
              {filteredMeres.map((mere) => (
                <div
                  key={mere.id}
                  className="suggestion-item"
                  onClick={() => handleSelectMere(mere)}
                >
                  {mere.nom} {mere.prenom}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label>Date et Heure d'Accouchement :</label>
          <input
            type="datetime-local"
            name="date_accouchement"
            {...register("date_accouchement", { required: true })}
          />
        </div>
        <div>
          <label>Type d'Accouchement :</label>
          <input
            type="text"
            name="type_accouchement"
            {...register("type_accouchement", { required: true })}
          />
        </div>
        <div>
          <label>Notes :</label>
          <textarea name="notes" {...register("notes")} />
        </div>
        <div>
          <label>Bébés :</label>
          {fields.length > 0 ? (
            fields.map((field, index) => (
              <div key={field.id} className="bebe-field">
                <h4>Bébé {index + 1}</h4>
                <label>Nom du Bébé :</label>
                <input
                  type="text"
                  {...register(`bebes.${index}.nom`, { required: true })}
                  defaultValue={field.nom}
                />
                <label>Prénom du Bébé :</label>
                <input
                  type="text"
                  {...register(`bebes.${index}.prenom`, { required: true })}
                  defaultValue={field.prenom}
                />
                <label>Sexe du Bébé :</label>
                <select {...register(`bebes.${index}.sexe`, { required: true })}>
                  <option value="M" selected={field.sexe === "M"}>
                    Masculin
                  </option>
                  <option value="F" selected={field.sexe === "F"}>
                    Féminin
                  </option>
                </select>
                <label>Numéro de Sécurité Sociale :</label>
                <input
                  type="text"
                  {...register(`bebes.${index}.num_secu_social`)}
                  defaultValue={field.num_secu_social}
                />
                <label>Adresse :</label>
                <input
                  type="text"
                  {...register(`bebes.${index}.adresse`)}
                  defaultValue={field.adresse}
                />
                <label>Téléphone :</label>
                <input
                  type="text"
                  {...register(`bebes.${index}.telephone`)}
                  defaultValue={field.telephone}
                />
                <input
                  type="hidden"
                  {...register(`bebes.${index}.isExisting`)}
                  value={field.isExisting}
                />
                <input
                  type="hidden"
                  {...register(`bebes.${index}.id`)}
                  value={field.id}
                />
                <button type="button" onClick={() => remove(index)}>
                  Supprimer
                </button>
              </div>
            ))
          ) : (
            <p>Aucun bébé existant trouvé.</p>
          )}
          <button
            type="button"
            onClick={() =>
              append({
                nom: "",
                prenom: "",
                sexe: "",
                num_secu_social: mereNumSecuSocial,
                adresse: mereAdresse,
                telephone: mereTelephone,
                isExisting: false,
              })
            }
          >
            Ajouter un Bébé
          </button>
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default EditMaternite;