import { get, post, remove, update } from ".";

export async function getPharmacies() {
    return await get("/api/pharmacies");
}

export async function getPharmacieById(id) {
    return await get(`/api/pharmacies/${id}`);
}

export async function createPharmacie(data) {
    return await post("/api/pharmacies", data);
}

export async function updatePharmacie(id, data) {
    return await update(`/api/pharmacies/${id}`, data);
}

export async function deletePharmacie(id) {
    return await remove(`/api/pharmacies/${id}`);
}