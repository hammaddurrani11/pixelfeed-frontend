import api from "./api";

const getUserById = async (id) => {
    return api.get(`/api/user/${id}`);
}

const editUserProfile = async (id, data) => {
    return api.patch(`/api/user/${id}`, data);
}

export {
    getUserById,
    editUserProfile
}