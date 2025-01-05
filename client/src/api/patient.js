import { get, post, remove, update } from ".";

// Patient routes
export async function getPatients() {
    return await get("/api/patients");
}

export async function getPatientById(id) {
    return await get(`/api/patients/${id}`);
}

export async function createPatient(data) {
    return await post("/api/patients", data);
}

export async function updatePatient(id, data) {
    return await update(`/api/patients/${id}`, data);
}

export async function deletePatient(id) {
    return await remove(`/api/patients/${id}`);
}
