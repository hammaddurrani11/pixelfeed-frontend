import { useState } from "react";
import { getUserById, editUserProfile, getCurrentUser } from "../services/userService";

export const useUser = () => {
    const [loading, setLoading] = useState(false);

    const getUser = async (id) => {
        try {
            setLoading(true);

            const response = await getUserById(id);
            return response.data.user;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const editUser = async (id, data) => {
        try {
            setLoading(true);

            const response = await editUserProfile(id, data);
            return response.data.user;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const getCurrentUserDetails = async () => {
        try {
            setLoading(true);

            const response = await getCurrentUser();
            return response.data.user;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    return {
        getUser,
        loading,
        editUser,
        getCurrentUserDetails
    }
}