import { get, post, remove, update } from ".";

export async function getBiologie() {
    return await get("/api/biologies");
}

export async function getBiologieById(id) {
    return await get(`/api/biologies/${id}`);
}

export async function createBiologie(data) {
    return await post("/api/biologies", data);
}


export async function updateBiologie(id, data) {
    return await update(`/api/biologies/${id}`, data);
}

export async function deleteBiologie(id) {
    return await remove(`/api/biologies/${id}`);
}