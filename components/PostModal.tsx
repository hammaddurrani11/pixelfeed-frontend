"use client";

import Image from "next/image";
import PostHeader from "./subComponents/PostHeader";
import { LikeIcon, CommentIcon, ShareIcon, SaveIcon, DisplayPicture } from "@/public";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

const PostModal = ({ post, onClose }: { post: any; onClose: () => void }) => {
    const { getUser } = useUser();
    const [userData, setUserData] = useState<any>(null);
    const user = useAuthStore((state) => state.user);

    const isMyPost = user?._id === post?.user;
    console.log("isMyPost: ", isMyPost);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser(post.user);
                setUserData(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, []);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
            onClick={handleBackdropClick}
        >
            <button
                onClick={onClose}
                className="absolute top-5 right-5 text-white hover:text-white/70 cursor-pointer transition-colors z-50"
                aria-label="Close"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            <div
                className="bg-white flex overflow-hidden shadow-2xl"
                style={{ width: "min(1100px, 90vw)", height: "min(650px, 85vh)" }}
            >
                <div className="w-[55%] bg-black flex flex-col items-start justify-center flex-shrink-0">
                    <div className="flex-1 bg-black overflow-y-auto flex items-start justify-center">
                        <Image
                            src={post?.picture}
                            alt="post"
                            width={800}
                            height={800}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                <div className="w-[45%] flex flex-col border-l border-gray-200">
                    <div className="px-4 border-b border-gray-200">
                        <div className="flex items-center justify-between py-4 w-full">
                            <div className="flex gap-3 items-center">
                                <Link href={`/profile/${post?.user}`} className="flex gap-3 items-center">
                                    <Image
                                        src={userData?.profilePicture || DisplayPicture}
                                        alt="display-picture"
                                        className="rounded-full h-10"
                                        height={40}
                                        width={40}
                                    />
                                    <p className="font-medium text-sm text-black">{userData?.username}</p>
                                </Link>
                            </div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu cursor-pointer bg-white rounded-box z-50 w-52 p-2 shadow-lg border border-base-content/10">
                                    <li className="hover:bg-black text-black hover:text-white px-2 py-1 rounded-sm">Edit Post</li>
                                    <li className="hover:bg-black text-black hover:text-white px-2 py-1 rounded-sm">Delete Post</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-4">
                        <div className="flex gap-3 mb-5">
                            <Image
                                src={userData?.profilePicture || DisplayPicture}
                                alt="avatar"
                                width={32}
                                height={32}
                                className="rounded-full h-8 w-8 object-cover flex-shrink-0 mt-0.5"
                            />
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold mr-2">{userData?.username}</span>
                                    {post?.caption}
                                </p>
                                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                                    <span>3d</span>
                                    <button className="hover:text-gray-600 cursor-pointer">See translation</button>
                                </div>
                            </div>
                        </div>

                        {[
                            { user: "user1", text: "Amazing post! 🔥", time: "1d", likes: "1 like" },
                            { user: "user2", text: "This is incredible work!", time: "1d", likes: "1 like" },
                            { user: "user3", text: "Love the colors and vibe ✨", time: "2d", likes: "" },
                        ].map((comment, idx) => (
                            <div key={idx} className="flex gap-3 mb-5">
                                <Image
                                    src={DisplayPicture}
                                    alt="avatar"
                                    width={32}
                                    height={32}
                                    className="rounded-full h-8 w-8 object-cover flex-shrink-0 mt-0.5"
                                />
                                <div className="flex-1">
                                    <p className="text-sm">
                                        <span className="font-semibold mr-2">{comment.user}</span>
                                        {comment.text}
                                    </p>
                                    <div className="flex gap-3 mt-2 text-xs text-gray-400">
                                        <span>{comment.time}</span>
                                        {comment.likes && <span>{comment.likes}</span>}
                                        <button className="hover:text-gray-600 cursor-pointer">Reply</button>
                                    </div>
                                </div>
                                <button className="mt-2 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-gray-600">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 px-4 pt-3">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4">
                                <button className="hover:opacity-60 transition-opacity cursor-pointer">
                                    <Image src={LikeIcon} alt="like" className="w-6 h-6" />
                                </button>
                                <button className="hover:opacity-60 transition-opacity cursor-pointer">
                                    <Image src={CommentIcon} alt="comment" className="w-6 h-6" />
                                </button>
                                <button className="hover:opacity-60 transition-opacity cursor-pointer">
                                    <Image src={ShareIcon} alt="share" className="w-6 h-6" />
                                </button>
                            </div>
                            <button className="hover:opacity-60 transition-opacity cursor-pointer">
                                <Image src={SaveIcon} alt="save" className="w-6 h-6" />
                            </button>
                        </div>

                        <p className="text-sm font-semibold mt-2">
                            Liked by <span className="font-bold">{userData?.username || "someone"}</span> and <span className="font-bold">1,000 others</span>
                        </p>

                        <p className="text-[11px] text-gray-400 mt-1 mb-3 uppercase tracking-wide">
                            3 days ago
                        </p>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800 flex-shrink-0">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                            <line x1="9" y1="9" x2="9.01" y2="9" />
                            <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-1 text-sm outline-none placeholder:text-gray-400 bg-transparent"
                        />
                        <button className="text-sm font-semibold text-blue-500 hover:text-blue-700 cursor-pointer transition-colors">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostModal;