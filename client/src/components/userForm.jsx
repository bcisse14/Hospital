import React, { useState } from "react";

function UserForm({ onSubmit }) {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Transmet les données au parent via le callback
        onSubmit({ nom, prenom, email, password });

        // Réinitialise les champs du formulaire après soumission
        setNom("");
        setPrenom("");
        setEmail("");
        setPassword("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nom">Nom:</label>
                <input
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="prenom">Prénom:</label>
                <input
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Mot de passe:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create User</button>
        </form>
    );
}

export default UserForm;
