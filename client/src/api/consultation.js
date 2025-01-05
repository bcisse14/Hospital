import { get, post, remove, update } from ".";

export async function getConsultations() {
    return await get("/api/consultations");
}

export async function getConsultationById(id) {
    return await get(`/api/consultations/${id}`);
}

export async function createConsultation(data) {
    return await post("/api/consultations", data);
}


export async function updateConsultation(id, data) {
    return await update(`/api/consultations/${id}`, data);
}

export async function deleteConsultation(id) {
    return await remove(`/api/consultations/${id}`);
}