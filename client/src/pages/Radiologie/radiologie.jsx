import React from "react";
import { Outlet, Link } from "react-router-dom";

function Radiologies() {
  return (
    <div className="radiologie-wrapper">
      <h1>Gestion des radiologies</h1>
      <nav>
        <Link to="list" className="radiologie-link">Liste des radiologies</Link>
        <Link to="add" className="radiologie-link">Ajouter une radiologie</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Radiologies;