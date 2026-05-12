"use client";

import { useState } from "react";
import { login, register, logout } from "../services/authService";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useAuthStore();

    const registerUser = async (userData) => {
        try {
            setLoading(true);

            const response = await register(userData);

            if (response.data.success) {
                setUser(response?.data?.user);
                router.push('/');
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const loginUser = async (userData) => {
        try {
            setLoading(true);

            const response = await login(userData);

            if (response?.data?.success) {
                setUser(response?.data?.user);
                router.push('/');
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const logOutUser = async () => {
        try {
            setLoading(true);
            await logout();
            router.push('/login');
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
        registerUser,
        loading,
        loginUser,
        logOutUser
    }
}