import { usePost } from "@/hooks/usePost"
import { CommentIcon, LikeIcon, SaveIcon, ShareIcon, LikedIcon } from "@/public"
import { useAuthStore } from "@/store/authStore"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const PostActions = ({ post }: { post: any }) => {
    const [liked, setLiked] = useState(false);

    const [likesCount, setLikesCount] = useState(
        post.likes?.length || 0
    );

    const { handleLikePost } = usePost();

    const userId = useAuthStore((state) => state.user?._id);

    const handleLike = async (post: any) => {

        if (liked) {
            setLikesCount((prev: number) => prev - 1);
        } else {
            setLikesCount((prev: number) => prev + 1);
        }

        setLiked(!liked);

        try {

            await handleLikePost(post._id);

        } catch (error) {

            setLiked(liked);

            if (liked) {
                setLikesCount((prev: number) => prev + 1);
            } else {
                setLikesCount((prev: number) => prev - 1);
            }
        }
    };

    useEffect(() => {

        const isLiked = post.likes?.some(
            (id: string) => id.toString() === userId?.toString()
        );

        setLiked(isLiked);

    }, [post.likes, userId]);

    return (
        <div className="flex flex-row justify-between pt-5 pb-5 border-b border-gray-300">
            <div className="flex flex-row gap-5">
                <div className="text-center">
                    <Image src={liked ? LikedIcon : LikeIcon} alt="like-icon" className="w-6 h-6 cursor-pointer" onClick={() => handleLike(post)} />
                    <p className="text-xs">{likesCount}</p>
                </div>
                <div className="text-center">
                    <Link href={'#'}>
                        <Image src={CommentIcon} alt="comment-icon" className="w-6 h-6" />
                    </Link>
                    <p className="text-xs">100</p>
                </div>
                <div className="text-center">
                    <Link href={'#'}>
                        <Image src={ShareIcon} alt="share-icon" className="w-6 h-6" />
                    </Link>
                    <p className="text-xs">10</p>
                </div>
            </div>
            <div>
                <Link href={'#'}>
                    <Image src={SaveIcon} alt="save-icon" className="w-6 h-6" />
                </Link>
            </div>
        </div>
    )
}

export default PostActions