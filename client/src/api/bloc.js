import { get, post, remove, update } from ".";

export async function getBlocOperatoires() {
    return await get("/api/bloc_operatoires");
}

export async function getBlocOperatoireById(id) {
    return await get(`/api/bloc_operatoires/${id}`);
}

export async function createBlocOperatoire(data) {
    return await post("/api/bloc_operatoires", data);
}

export async function updateBlocOperatoire(id, data) {
    return await update(`/api/bloc_operatoires/${id}`, data);
}

export async function deleteBlocOperatoire(id) {
    return await remove(`/api/bloc_operatoires/${id}`);
}