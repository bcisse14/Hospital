import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlocList = () => {
  const [blocs, setBlocs] = useState([]);

  useEffect(() => {
    const fetchBlocs = async () => {
      try {
        const response = await fetch('/api/blocs'); // Adjust the API endpoint as necessary
        const data = await response.json();
        setBlocs(data);
      } catch (error) {
        console.error('Error fetching blocs:', error);
      }
    };

    fetchBlocs();
  }, []);

  return (
    <div>
      <h1>Bloc List</h1>
      <Link to="/bloc/add">Add New Bloc</Link>
      <ul>
        {blocs.map(bloc => (
          <li key={bloc.id}>
            <Link to={`/bloc/details/${bloc.id}`}>{bloc.name}</Link>
            <Link to={`/bloc/edit/${bloc.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlocList;