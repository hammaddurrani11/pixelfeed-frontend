import { useState } from "react";

import {
    createPost,
    getAllPost,
    getUserPost,
    getPostById,
    editPost,
    deletePost,
    likePost,
    commentPost
} from "../services/postService";

import { useRouter } from "next/navigation";

export const usePost = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCreatePost = async (postData) => {
        try {
            setLoading(true);

            const response = await createPost(postData);

            if (response.data.success) {
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

    const handleGetAllPost = async () => {
        try {
            setLoading(true);

            const response = await getAllPost();
            return response.data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const handleGetUserPost = async (userId) => {
        try {
            setLoading(true);

            const response = await getUserPost(userId);
            return response.data.posts;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const handleGetPostById = async (postId) => {
        try {
            setLoading(true);

            const response = await getPostById(postId);
            return response.data.post;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const handleEditPost = async (postId, data) => {
        try {
            setLoading(true);

            const response = await editPost(postId, data);

            if (response.data.success) {
                router.push('/');
            }

            return response.data.post;

        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const handleDeletePost = async (postId) => {
        try {
            setLoading(true);

            const response = await deletePost(postId);

            if (response.data.success) {
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

    const handleLikePost = async (postId) => {
        try {
            setLoading(true);

            const response = await likePost(postId);

            return response.data.post;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const handleCommentPost = async (postId) => {
        try {
            setLoading(true);

            const response = await commentPost(postId);

            return response.data.post;
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
        handleCreatePost,
        loading,
        handleGetAllPost,
        handleGetUserPost,
        handleGetPostById,
        handleEditPost,
        handleDeletePost,
        handleLikePost,
        handleCommentPost
    }
}