
import React from "react";
import { Outlet, Link } from "react-router-dom";

function Urgence() {
  return (
    <div className="urgence-wrapper">
      <h1>Gestion des Urgences</h1>
      <nav>
        <Link to="list" className="urgence-link">Liste des urgences</Link>
        <Link to="add" className="urgence-link">Ajouter une urgence</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Urgence;
