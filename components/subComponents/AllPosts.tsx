"use client";
import { useState } from "react";
import Image from "next/image"
import PostModal from "../PostModal"

const AllPosts = ({ posts }: { posts: any[] }) => {
    const [selectedPost, setSelectedPost] = useState<any>(null);

    const openPostModal = (post: any) => {
        setSelectedPost(post);
    }

    const closePostModal = () => {
        setSelectedPost(null);
    }

    return (
        <div className="grid grid-cols-3 gap-0 mb-10">

            {posts.length === 0 && (
                <div className="col-span-3 text-center">
                    <p className="text-gray-500">No posts found</p>
                </div>
            )}
            
            {posts?.map((post, idx) => (
                <Image
                    src={post.picture}
                    alt="post-image"
                    width={280}
                    height={280}
                    key={idx}
                    onClick={() => openPostModal(post)}
                    className="w-full h-[300px] object-top object-cover cursor-pointer hover:opacity-80 transition-all duration-300"
                />
            ))}
            {selectedPost && <PostModal post={selectedPost} onClose={closePostModal} />}
        </div>
    )
}

export default AllPosts