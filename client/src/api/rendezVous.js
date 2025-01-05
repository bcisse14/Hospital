import { get, post, remove, update } from ".";

// Rendez Vous Routes


export async function getRendezvous() {
    return await get("/api/rendezvouses");
}

export async function getRendezvousById(id) {
    return await get(`/api/rendezvouses/${id}`);
}

export async function createRendezvous(data) {
    return await post("/api/rendezvouses", data);
}

export async function updateRendezvous(id, data) {
    return await update(`/api/rendezvouses/${id}`, data);
}

export async function deleteRendezvous(id) {
    return await remove(`/api/rendezvouses/${id}`);
}