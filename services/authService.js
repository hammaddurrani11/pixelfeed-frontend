import api from "./api";

const register = async (userData) => {
    return api.post("/api/auth/register", userData);
}

const login = async (userData) => {
    return api.post("/api/auth/login", userData);
}

const logout = async () => {
    return api.post("/api/auth/logout");
}

export {
    register,
    login,
    logout
}