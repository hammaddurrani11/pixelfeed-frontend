"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePost } from '@/hooks/usePost';

const EditPost = ({ id }: { id: string }) => {
    const [image, setImage] = useState<string | null>(null);
    const [caption, setCaption] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { handleGetPostById, handleEditPost } = usePost();

    const getPostById = async () => {
        try {
            const res = await handleGetPostById(id);
            setCaption(res.caption);
            setImage(res.picture);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            await handleEditPost(id, { caption });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPostById();
    }, [])

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
            <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-8 text-center bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Edit Post
                    </h2>

                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="relative">
                            <Image src={image || ""} alt="post" width={500} height={500} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <textarea
                                placeholder="Write a caption..."
                                name="caption"
                                onChange={(e) => setCaption(e.target.value)}
                                value={caption}
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 focus:bg-white outline-none resize-none text-gray-700 transition-all placeholder:text-gray-400 leading-relaxed"
                                rows={4}
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-black cursor-pointer text-white rounded-2xl py-5 font-bold shadow-2xl shadow-gray-200 hover:bg-gray-800 hover:shadow-gray-200 transition-all duration-300 transform active:scale-[0.98]"
                        >
                            {isLoading ? 'Sharing...' : 'Share Post'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPost