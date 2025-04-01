import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditChirurgie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chirurgie, setChirurgie] = useState({
    name: '',
    description: '',
    // Add other fields as necessary
  });

  useEffect(() => {
    // Fetch the current details of the Chirurgie using the id
    const fetchChirurgie = async () => {
      const response = await fetch(`/api/chirurgies/${id}`);
      const data = await response.json();
      setChirurgie(data);
    };

    fetchChirurgie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChirurgie({ ...chirurgie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update the Chirurgie details
    await fetch(`/api/chirurgies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chirurgie),
    });
    navigate('/chirurgie/list'); // Redirect to the list after editing
  };

  return (
    <div>
      <h2>Edit Chirurgie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={chirurgie.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={chirurgie.description}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add other fields as necessary */}
        <button type="submit">Update Chirurgie</button>
      </form>
    </div>
  );
};

export default EditChirurgie;