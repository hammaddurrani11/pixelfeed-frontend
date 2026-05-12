import { DisplayPicture } from "@/public"
import Image from "next/image"
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import Link from "next/link";

const PostHeader = ({ post }: { post: any }) => {
    const { user } = post;
    const { getUser } = useUser();
    const [userData, setUserData] = useState<any>(null);

    const getUserById = async () => {
        try {
            const response = await getUser(user);
            setUserData(response);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        getUserById();
    }, [])

    return (
        <div className="flex items-center justify-between py-4 w-full">
            <div className="flex gap-3 items-center">
                <Link href={`/profile/${user}`} className="flex gap-3 items-center">
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
                <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-50 w-52 p-2 shadow-lg border border-base-content/10">
                    <li><Link href={`/profile/${user}`}>Visit Profile</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default PostHeader