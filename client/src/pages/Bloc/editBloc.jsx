import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBloc = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bloc, setBloc] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the current Bloc details using the id
    const fetchBloc = async () => {
      try {
        const response = await fetch(`/api/blocs/${id}`);
        const data = await response.json();
        setBloc(data);
      } catch (error) {
        console.error('Error fetching Bloc details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBloc();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBloc({ ...bloc, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/blocs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bloc),
      });
      navigate('/blocs/list'); // Redirect to the list after editing
    } catch (error) {
      console.error('Error updating Bloc:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Bloc</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={bloc.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={bloc.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Bloc</button>
      </form>
    </div>
  );
};

export default EditBloc;