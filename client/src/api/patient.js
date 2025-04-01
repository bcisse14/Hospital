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
    return await update(`/api/patients/${id}`, {
        nom: data.nom,
        prenom: data.prenom,
        date_naissance: data.date_naissance,
        adresse: data.adresse,
        telephone: data.telephone,
        num_secu_social: data.num_secu_social,
        sexe: data.sexe,
        // numero_dossier: data.numero_dossier
      })
}

export async function deletePatient(id) {
    return await remove(`/api/patients/${id}`);
}
