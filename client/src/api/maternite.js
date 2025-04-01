import { get, post, remove, update } from ".";

export async function getMaternite() {
    return await get("/api/maternites");
}

export async function getMaterniteById(id) {
    return await get(`/api/maternites/${id}`);
}

export async function createMaternite(data) {
    return await post("/api/maternites", data);
}


export async function updateMaternite(id, data) {
    return await update(`/api/maternites/${id}`, data);
}

export async function deleteMaternite(id) {
    return await remove(`/api/maternites/${id}`);
}