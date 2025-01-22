import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPharmacieById, updatePharmacie } from "../../api/pharmacie";

function EditMedicament() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    medicament: "",
    description: "",
    stock: 0,
    date_peremption: new Date().toISOString().split("T")[0], // Date actuelle par défaut
    numero_lot: "",
    emplacement: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPharmacie = async () => {
      try {
        const pharmacie = await getPharmacieById(id);
        if (!pharmacie) {
          alert("Médicament introuvable !");
          navigate("/pharmacies/list");
          return;
        }
        setFormData({
          medicament: pharmacie.medicament || "",
          description: pharmacie.description || "",
          stock: pharmacie.stock || 0,
          date_peremption: pharmacie.date_peremption
            ? pharmacie.date_peremption.split("T")[0]
            : new Date().toISOString().split("T")[0], // Date actuelle si aucune date disponible
          numero_lot: pharmacie.numero_lot || "",
          emplacement: pharmacie.emplacement || "",
        });
      } catch (error) {
        console.error("Erreur lors de la récupération du médicament :", error);
      }
    };
    fetchPharmacie();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePharmacie(id, formData);
      alert("Médicament modifié avec succès !");
      navigate("/pharmacie/list");
    } catch (error) {
      console.error("Erreur lors de la modification du médicament :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-pharmacie">
      <h2>Modifier les informations du Médicament</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du Médicament :</label>
          <input
            type="text"
            name="medicament"
            value={formData.medicament}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description :</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock :</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div>
          <label>Date de Péremption :</label>
          <input
            type="date"
            name="date_peremption"
            value={formData.date_peremption}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Numéro de Lot :</label>
          <input
            type="text"
            name="numero_lot"
            value={formData.numero_lot}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Emplacement :</label>
          <input
            type="text"
            name="emplacement"
            value={formData.emplacement}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Modification en cours..." : "Modifier"}
        </button>
      </form>
    </div>
  );
}

export default EditMedicament;
