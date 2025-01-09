import React from "react";
import { Outlet, Link } from "react-router-dom";

function Medecins() {
  return (
    <div className="medecins-wrapper">
      <h1>Gestion des Médecins</h1>
      <nav>
        <Link to="list" className="medecins-link">Liste des Médecins</Link>
        <Link to="add" className="medecins-link">Ajouter un Médecin</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Medecins;
