import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPharmacieById } from "../../api/pharmacie";

function PharmacieDetails() {
  const { id } = useParams();
  const [pharmacie, setPharmacie] = useState(null);

  useEffect(() => {
    const fetchPharmacie = async () => {
      try {
        const data = await getPharmacieById(id);
        setPharmacie(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du médicament :", error);
      }
    };
    fetchPharmacie();
  }, [id]);

  if (!pharmacie) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="pharmacie-details">
      <h2>Détails du Médicament</h2>
      <p><strong>Nom :</strong> {pharmacie.medicament}</p>
      <p><strong>Description :</strong> {pharmacie.description}</p>
      <p><strong>Stock :</strong> {pharmacie.stock}</p>
      <p><strong>Date de Péremption :</strong> {new Date(pharmacie.date_peremption).toLocaleDateString("fr-FR")}</p>
      <p><strong>Numéro de Lot :</strong> {pharmacie.numero_lot}</p>
      <p><strong>Emplacement :</strong> {pharmacie.emplacement}</p>
    </div>
  );
}

export default PharmacieDetails;
