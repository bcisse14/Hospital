import React, { useState } from "react";
import { createUser } from "../api/user";
import UserForm from "../components/userForm";

function SignUp() {
    const [message, setMessage] = useState("");

    const handleCreateUser = async (userData) => {
        try {
            // Appel à l'API pour créer l'utilisateur
            const response = await createUser(userData);
            console.log("User created:", response);
            setMessage("User created successfully!");
        } catch (err) {
            console.error("Error creating user:", err);
            setMessage("Failed to create user.");
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            <UserForm onSubmit={handleCreateUser} />
            {message && <p>{message}</p>}
        </div>
    );
}

export default SignUp;
