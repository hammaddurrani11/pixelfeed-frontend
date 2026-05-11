import api from "./api";

const getUserById = async (id) => {
    return api.get(`/api/user/${id}`);
}

const editUserProfile = async (id, data) => {
    return api.patch(`/api/user/${id}`, data);
}

const getCurrentUser = async () => {
    return api.get(`/api/user`);
}

export {
    getUserById,
    editUserProfile,
    getCurrentUser
}