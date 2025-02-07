import { get, post, remove, update } from ".";

export async function getGynecologies() {
    return await get("/api/gynecologies");
}

export async function getGynecologyById(id) {
    return await get(`/api/gynecologies/${id}`);
}

export async function createGynecology(data) {
    return await post("/api/gynecologies", data);
}

export async function updateGynecology(id, data) {
    try {
        console.log("Updating gynecology with data:", data);
        const response = await update(`/api/gynecologies/${id}`, data);
        console.log("Gynecology updated successfully:", response);
        return response;
    } catch (error) {
        console.error("Error updating gynecology:", error);
        throw error;
    }
}

export async function deleteGynecology(id) {
    return await remove(`/api/gynecologies/${id}`);
}