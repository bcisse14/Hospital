import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createMaternite } from "../../api/maternite";
import { createPatient, getPatients } from "../../api/patient";
import "../../assets/hospitalisation.css";

function AddMaternite() {
  const { register, handleSubmit, setValue, control, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "bebes",
  });
  const [meres, setMeres] = useState([]);
  const [mereSearch, setMereSearch] = useState("");
  const [showMereSuggestions, setShowMereSuggestions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await getPatients();
        setMeres(patientsData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", data);

      // Pour debug
      const newPatient = {
        nom: data.bebes[0].nom,
        prenom: data.bebes[0].prenom,
        date_naissance: data.date_accouchement,
        adresse: data.mere_adresse,
        telephone: data.mere_telephone,
        num_secu_social: data.mere_num_secu_social,
        sexe: data.bebes[0].sexe === "M" ? "Homme" : "Femme", // Conversion M/F en Homme/Femme
        date_enregistrement: new Date().toISOString(), // Ajout de la date d'enregistrement
      };
      
      console.log("Debug - New patient data:", newPatient);
      
      const createdPatient = await createPatient(newPatient);
      console.log("Debug - Created patient:", createdPatient);

      if (createdPatient && createdPatient.id) {
        const updatedData = {
          mere: `/api/patients/${data.mere}`,
          patients: [`/api/patients/${createdPatient.id}`],
          date_accouchement: data.date_accouchement,
          type_accouchement: data.type_accouchement,
          notes: data.notes,
        };

        console.log("Final maternité data:", updatedData);

        await createMaternite(updatedData);
        alert("Maternité ajoutée avec succès !");
        navigate("/maternite/list");
      } else {
        throw new Error("Erreur lors de la création du patient");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la maternité :", error);
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

  return (
    <div className="add-maternite">
      <h2>Ajouter une Maternité</h2>
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
          {fields.map((field, index) => (
            <div key={field.id} className="bebe-field">
              <label>Nom du Bébé :</label>
              <input
                type="text"
                {...register(`bebes.${index}.nom`, { required: true })}
              />
              <label>Prénom du Bébé :</label>
              <input
                type="text"
                {...register(`bebes.${index}.prenom`, { required: true })}
              />
              <label>Sexe du Bébé :</label>
              <select {...register(`bebes.${index}.sexe`, { required: true })}>
                <option value="">Sélectionner</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
              <label>Numéro de Sécurité Sociale :</label>
              <input
                type="text"
                {...register(`bebes.${index}.num_secu_social`)}
                defaultValue={mereNumSecuSocial}
                readOnly
              />
              <label>Adresse :</label>
              <input
                type="text"
                {...register(`bebes.${index}.adresse`)}
                defaultValue={mereAdresse}
                readOnly
              />
              <label>Téléphone :</label>
              <input
                type="text"
                {...register(`bebes.${index}.telephone`)}
                defaultValue={mereTelephone}
                readOnly
              />
              <button type="button" onClick={() => remove(index)}>
                Supprimer
              </button>
            </div>
          ))}
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
              })
            }
          >
            Ajouter un Bébé
          </button>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddMaternite;