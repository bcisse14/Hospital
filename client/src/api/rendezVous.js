import { get, post, remove, update } from ".";

// Rendez Vous Routes


export async function getRendezvous() {
    return await get("/api/rendez_vouses");
}

export async function getRendezvousById(id) {
    return await get(`/api/rendez_vouses/${id}`);
}

export async function createRendezvous(data) {
    return await post("/api/rendez_vouses", data);
}

export async function updateRendezvous(id, data) {
    return await update(`/api/rendez_vouses/${id}`, data);
}

export async function deleteRendezvous(id) {
    return await remove(`/api/rendez_vouses/${id}`);
}