import EditProfile from "@/components/EditProfile";
import Sidebar from "@/components/Sidebar";

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div className="flex flex-row min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                <EditProfile id={id} />
            </main>
        </div>
    )
}