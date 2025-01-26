import { get, post, remove, update } from ".";

export async function getPrescription() {
    return await get("/api/prescription_medicaments");
}

export async function getPrescriptionById(id) {
    return await get(`/api/prescription_medicaments/${id}`);
}

export async function createPrescription(data) {
    return await post("/api/prescription_medicaments", data);
}

export async function updatePrescription(id, data) {
    return await update(`/api/prescription_medicaments/${id}`, data);
}

export async function deletePrescription(id) {
    return await remove(`/api/prescription_medicaments/${id}`);
}
