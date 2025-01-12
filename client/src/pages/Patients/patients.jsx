
import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../assets/unified.css";


function Patients() {
  return (
    <div className="patients-wrapper">
      <h1>Gestion des Patients</h1>
      <nav>
        <Link to="list" className="patients-link">Liste des Patients</Link>
        <Link to="add" className="patients-link">Ajouter un Patient</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Patients;
