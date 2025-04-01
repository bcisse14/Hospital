import React, { useEffect, useState } from 'react';

const ChirurgieList = () => {
  const [chirurgies, setChirurgies] = useState([]);

  useEffect(() => {
    const fetchChirurgies = async () => {
      try {
        const response = await fetch('/api/chirurgies'); // Adjust the API endpoint as needed
        const data = await response.json();
        setChirurgies(data);
      } catch (error) {
        console.error('Error fetching chirurgies:', error);
      }
    };

    fetchChirurgies();
  }, []);

  return (
    <div>
      <h1>Chirurgie List</h1>
      <ul>
        {chirurgies.map((chirurgie) => (
          <li key={chirurgie.id}>
            <h2>{chirurgie.name}</h2>
            <p>{chirurgie.description}</p>
            {/* Add links to details or edit pages if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChirurgieList;