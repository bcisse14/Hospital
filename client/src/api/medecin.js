import { get, post, remove, update } from ".";

export async function getMedecin() {
    return await get("/api/medecins");
}

export async function getMedecinById(id) {
    return await get(`/api/medecins/${id}`);
}

export async function createMedecin(data) {
    return await post("/api/medecins", data);
}

export async function updateMedecin(id, data) {
    return await update(`/api/medecins/${id}`, data);
}

export async function deleteMedecin(id) {
    return await remove(`/api/medecins/${id}`);
}