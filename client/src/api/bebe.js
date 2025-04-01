import { get, post, remove, update } from ".";

export async function getBebe() {
    return await get("/api/bebes");
}

export async function getBebeById(id) {
    return await get(`/api/bebes/${id}`);
}

export async function createBebe(data) {
    try {
        const bebe = await post("/api/bebes", data);
        console.log("Bébé created:", bebe);
        return bebe;
    } catch (error) {
        console.error("Erreur lors de la création du bébé:", error);
        throw error;
    }
}

export async function updateBebe(id, data) {
    return await update(`/api/bebes/${id}`, data);
}

export async function deleteBebe(id) {
    return await remove(`/api/bebes/${id}`);
}