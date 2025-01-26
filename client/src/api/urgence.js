import { get, post, remove, update } from ".";

export async function getUrgence() {
    return await get("/api/urgences");
}

export async function getUrgenceById(id) {
    return await get(`/api/urgences/${id}`);
}

export async function createUrgence(data) {
    return await post("/api/urgences", data);
}

export async function updateUrgence(id, data) {
    return await update(`/api/urgences/${id}`, data);
}

export async function deleteUrgence(id) {
    return await remove(`/api/urgences/${id}`);
}