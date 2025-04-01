import { get, post, remove, update } from ".";

export async function getChirurgies() {
    return await get("/api/chirurgies");
}

export async function getChirurgieById(id) {
    return await get(`/api/chirurgies/${id}`);
}

export async function createChirurgie(data) {
    return await post("/api/chirurgies", data);
}

export async function updateChirurgie(id, data) {
    return await update(`/api/chirurgies/${id}`, data);
}

export async function deleteChirurgie(id) {
    return await remove(`/api/chirurgies/${id}`);
}