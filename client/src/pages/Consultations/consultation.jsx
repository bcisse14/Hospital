
import React from "react";
import { Outlet, Link } from "react-router-dom";

function Consultations() {
  return (
    <div className="consultation-wrapper">
      <h1>Gestion des consultations</h1>
      <nav>
        <Link to="list" className="consultation-link">Liste des consultations</Link>
        <Link to="add" className="consultation-link">Ajouter une consultation</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Consultations;
