import { get, post, remove, update } from ".";


export async function getUsers() {
    return await get("/api/users");
}

export async function getUserById(id) {
    return await get(`/api/users/${id}`);
}

export async function createUser(data) {
    return await post("/api/users", { ...data, role: data.role || "patient" });
}


export async function updateUser(id, data) {
    return await update(`/api/users/${id}`, data);
}

export async function deleteUser(id) {
    return await remove(`/api/users/${id}`);
}
