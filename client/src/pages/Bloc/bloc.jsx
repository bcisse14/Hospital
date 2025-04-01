import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../assets/hospitalisation.css";

function Bloc() {
  return (
    <div className="bloc-wrapper">
      <h1>Gestion des Blocs</h1>
      <nav>
        <Link to="list" className="bloc-link">Liste des Blocs</Link>
        <Link to="add" className="bloc-link">Ajouter un Bloc</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Bloc;