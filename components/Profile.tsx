import ProfileContent from "./subComponents/ProfileContent"
import ProfileHeader from "./subComponents/ProfileHeader"

interface ProfileProps {
    posts: any[];
    user: any;
}

const Profile = ({ posts, user }: ProfileProps) => {
    return (
        <div className="w-2/3 mx-auto">
            <ProfileHeader user={user} post={posts} />
            <ProfileContent posts={posts} />
        </div>
    )
}

export default Profile