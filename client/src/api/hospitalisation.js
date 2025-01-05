import { get, post, remove, update } from ".";

export async function getHospitalisations() {
    return await get("/api/hospitalisations");
}

export async function getHospitalisationById(id) {
    return await get(`/api/hospitalisations/${id}`);
}

export async function createHospitalisation(data) {
    return await post("/api/hospitalisations", data);
}

export async function updateHospitalisation(id, data) {
    return await update(`/api/hospitalisations/${id}`, data);
}

export async function deleteHospitalisation(id) {
    return await remove(`/api/hospitalisations/${id}`);
}