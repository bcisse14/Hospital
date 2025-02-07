import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../assets/unified.css";

function Gynecology() {
  return (
    <div className="gynecology-wrapper">
      <h1>Gestion des Consultations Gynécologiques</h1>
      <nav>
        <Link to="list" className="gynecology-link">Liste des Consultations</Link>
        <Link to="add" className="gynecology-link">Ajouter une Consultation</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Gynecology;