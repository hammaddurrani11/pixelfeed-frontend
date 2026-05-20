import api from "./api";

const createPost = async (postData) => {
    return api.post("/api/post/create-post", postData);
}

const getAllPost = async () => {
    return api.get("/api/post");
}

const getUserPost = async (userId) => {
    return api.get(`/api/post/user/${userId}`);
}

const getPostById = async (postId) => {
    return api.get(`/api/post/${postId}`);
}

const editPost = async (postId, data) => {
    return api.patch(`/api/post/${postId}`, data);
}

const deletePost = async (postId) => {
    return api.delete(`/api/post/${postId}`);
}

const likePost = async (postId) => {
    return api.post(`/api/post/${postId}/like`);
}

const commentPost = async (postId, comment) => {
    return api.post(`/api/post/${postId}/comment`, { comment });
}

export {
    createPost,
    getAllPost,
    getUserPost,
    getPostById,
    editPost,
    deletePost,
    likePost,
    commentPost
}