import { get, post, remove, update } from ".";

export async function getMedicament() {
    return await get("/api/medicament_prescrits");
}

export async function getMedicamentById(id) {
    return await get(`/api/medicament_prescrits/${id}`);
}

export async function createMedicament(data) {
    try {
        console.log("Creating medicament with data:", data);
        const response = await post("/api/medicament_prescrits", data);
        console.log("Medicament created successfully:", response);
        return response;
    } catch (error) {
        console.error("Error creating medicament:", error);
        throw error;
    }
}

export async function updateMedicament(id, data) {
    return await update(`/api/medicament_prescrits/${id}`, data);
}

export async function deleteMedicament(id) {
    return await remove(`/api/medicament_prescrits/${id}`);
}