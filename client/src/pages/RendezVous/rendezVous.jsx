
import React from "react";
import { Outlet, Link } from "react-router-dom";

function RendezVous() {
  return (
    <div className="rdv-wrapper">
      <h1>Gestion des rendez-vous</h1>
      <nav>
        <Link to="list" className="rdv-link">Liste des rendez-vous</Link>
        <Link to="add" className="rdv-link">Ajouter un rendez-vous</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default RendezVous;
