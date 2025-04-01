import React, { useState } from 'react';

const AddChirurgie = () => {
  const [chirurgieData, setChirurgieData] = useState({
    patient: '',
    type_chirurgie: '',
    chirurgien: '',
    bloc: '',
    heure_debut: '',
    heure_fin: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChirurgieData({
      ...chirurgieData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the chirurgieData to the server
    console.log('Chirurgie added:', chirurgieData);
  };

  return (
    <div>
      <h2>Ajouter une Chirurgie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient:</label>
          <input
            type="url"
            name="patient"
            value={chirurgieData.patient}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Type de Chirurgie:</label>
          <input
            type="text"
            name="type_chirurgie"
            value={chirurgieData.type_chirurgie}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Chirurgien:</label>
          <input
            type="url"
            name="chirurgien"
            value={chirurgieData.chirurgien}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bloc:</label>
          <input
            type="url"
            name="bloc"
            value={chirurgieData.bloc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Heure de Début:</label>
          <input
            type="datetime-local"
            name="heure_debut"
            value={chirurgieData.heure_debut}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Heure de Fin:</label>
          <input
            type="datetime-local"
            name="heure_fin"
            value={chirurgieData.heure_fin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={chirurgieData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Ajouter Chirurgie</button>
      </form>
    </div>
  );
};

export default AddChirurgie;