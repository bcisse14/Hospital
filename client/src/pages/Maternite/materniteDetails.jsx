import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMaterniteById } from "../../api/maternite";
import { getPatientById } from "../../api/patient";
import { getBebeById } from "../../api/bebe";
import "../../assets/unified.css";

function MaterniteDetails() {
  const { id } = useParams();
  const [maternite, setMaternite] = useState(null);
  const [mere, setMere] = useState(null);
  const [bebes, setBebes] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const materniteData = await getMaterniteById(id);
        setMaternite(materniteData);

        const mereId = materniteData.mere
          ? parseInt(materniteData.mere.split("/").pop(), 10)
          : null;

        if (mereId) {
          const mereData = await getPatientById(mereId);
          setMere(mereData);
        }

        const bebesData = await Promise.all(
          materniteData.bebes.map(async (bebeUrl) => {
            const bebeId = parseInt(bebeUrl.split("/").pop(), 10);
            const bebeData = await getBebeById(bebeId);
            return bebeData;
          })
        );
        setBebes(bebesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!maternite || !mere || bebes.length === 0) {
    return <div>Chargement des détails...</div>;
  }

  const formattedAccouchementDate = new Date(maternite.date_accouchement).toLocaleDateString("fr-FR");

  return (
    <div className="maternite-details">
      <h2>Détails de la Maternité</h2>

      <h3>Informations de la Maternité</h3>
      <p><strong>Date d'Accouchement :</strong> {formattedAccouchementDate}</p>
      <p><strong>Type d'Accouchement :</strong> {maternite.type_accouchement}</p>
      <p><strong>Notes :</strong> {maternite.notes || "Non spécifié"}</p>

      <h3>Informations de la Mère</h3>
      <p><strong>Nom :</strong> {mere.nom}</p>
      <p><strong>Prénom :</strong> {mere.prenom}</p>
      <p><strong>Date de Naissance :</strong> {new Date(mere.date_naissance).toLocaleDateString("fr-FR")}</p>
      <p><strong>Adresse :</strong> {mere.adresse}</p>
      <p><strong>Téléphone :</strong> {mere.telephone}</p>
      <p><strong>Numéro de Sécurité Sociale :</strong> {mere.num_secu_social}</p>
      <p><strong>Sexe :</strong> {mere.sexe}</p>

      <h3>Informations des Bébés</h3>
      {bebes.map((bebe, index) => (
        <div key={index}>
          <p><strong>Nom :</strong> {bebe.nom}</p>
          <p><strong>Prénom :</strong> {bebe.prenom}</p>
          <p><strong>Date de Naissance :</strong> {new Date(bebe.date_naissance).toLocaleDateString("fr-FR")}</p>
          <p><strong>Sexe :</strong> {bebe.sexe}</p>
          <p><strong>Numéro de Dossier :</strong> {bebe.numero_dossier}</p>
        </div>
      ))}
    </div>
  );
}

export default MaterniteDetails;