import { get, post, remove, update } from ".";

export async function getRadiologie() {
    return await get("/api/radiologies");
}

export async function getRadiologieById(id) {
    return await get(`/api/radiologies/${id}`);
}

export async function createRadiologie(data) {
    return await post("/api/radiologies", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function updateRadiologie(id, data) {
    return await update(`/api/radiologies/${id}`, data);
}

export async function deleteRadiologie(id) {
    return await remove(`/api/radiologies/${id}`);
}