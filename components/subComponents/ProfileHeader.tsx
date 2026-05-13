import Image from "next/image"
import { DisplayPicture } from "@/public"
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

interface ProfileHeaderProps {
    user: any;
    post: any[]
}

const ProfileHeader = ({ user, post }: ProfileHeaderProps) => {
    const currentUser = useAuthStore((state) => state.user);
    const isProfileOwner = currentUser?._id === user?._id;

    return (
        <div className="flex gap-14 mt-10 items-center">
            <div>
                <Image
                    src={user?.profilePicture ? user.profilePicture : DisplayPicture}
                    alt="profile-pic"
                    width={150}
                    height={150}
                    className="rounded-full w-[120px] h-[120px] object-cover"
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-5 items-center">
                    <h4>{user?.username}</h4>
                    {isProfileOwner && <Link href={`/edit-profile/${currentUser?._id}`} className="bg-[#EFEFEF] p-2 rounded-md text-sm font-semibold cursor-pointer">Edit Profile</Link>}
                </div>
                <div className="flex flex-row gap-5">
                    <h4><span className="font-semibold">{post?.length || 0}</span> posts</h4>
                    <h4><span className="font-semibold">100</span> followers</h4>
                    <h4><span className="font-semibold">100</span> following</h4>
                </div>
                <div className="flex flex-col">
                    <h3 className="capitalize">{user?.fullName}</h3>
                    <p>{user?.bio}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader