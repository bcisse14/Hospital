import { get } from "."; // Import des méthodes d'API

export async function getUsers() {
  try {
    const response = await get("/api/users");
    return response; // Retourne tous les utilisateurs
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
}
