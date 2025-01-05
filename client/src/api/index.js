const URL = "http://localhost:8000"; // URL de base

// Fonction générique pour les appels API
async function api(method, path, data = {}) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method !== "GET") {
    options.body = JSON.stringify(data); // Convertit les données en JSON
  }

  try {
    const response = await fetch(URL + path, options);

    if (!response.ok) {
      // Gère les erreurs HTTP
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur réseau");
    }

    return await response.json(); // Retourne les données JSON
  } catch (error) {
    console.error("API error:", error.message);
    throw error; // Propage l'erreur
  }
}

// Fonctions spécifiques pour chaque méthode HTTP
async function get(path, data = {}) {
  return await api("GET", path, data);
}

async function post(path, data = {}) {
  return await api("POST", path, data);
}

async function update(path, data = {}) {
  return await api("PATCH", path, data);
}

async function remove(path, data = {}) {
  return await api("DELETE", path, data);
}

export { get, post, update, remove };
