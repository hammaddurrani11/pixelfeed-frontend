"use client";

import Image from "next/image"
import { DisplayPicture } from "@/public"
import { useUser } from "@/hooks/useUser"
import { useEffect, useState } from "react"

const EditProfile = ({ id }: { id: string }) => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const { getUser, editUser } = useUser();
    const [image, setImage] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            formData.append("profilePicture", file);
        }
    };

    const fetchUserDetails = async () => {
        const user = await getUser(id);
        setUserDetails(user);
        setImage(user?.profilePicture);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await editUser(id, formData);
    }

    useEffect(() => {
        fetchUserDetails();
    }, [id])

    return (
        <div className="w-full max-w-2xl mx-auto py-10 px-6">
            <h1 className="text-2xl font-bold mb-8 text-foreground">Edit Profile</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex items-center gap-6 mb-8 p-4 bg-gray-50 rounded-xl">
                    <div className="relative w-20 h-20 overflow-hidden rounded-full border border-gray-200">
                        <Image
                            src={image ? image : DisplayPicture}
                            alt={"Profile Picture"}
                            width={100}
                            height={100}
                            className="object-cover h-20 w-20"
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">{userDetails?.username}</h3>
                        <label className="text-blue-500 hover:text-blue-600 text-sm font-bold cursor-pointer">
                            Change profile photo
                            <input
                                type="file"
                                accept="image/*"
                                name="profilePicture"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            name="username"
                            value={userDetails?.username}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                        />
                        <p className="text-xs text-gray-500">Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={userDetails?.username}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Bio</label>
                        <textarea
                            name="bio"
                            value={userDetails?.bio}
                            rows={3}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all resize-none"
                        />
                        <p className="text-xs text-gray-500">0 / 150</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userDetails?.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Phone number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={userDetails?.phoneNumber}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={userDetails?.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all appearance-none bg-white"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="prefer not to say">Prefer not to say</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5 pt-4">
                        <label className="text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Change password"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                        />
                    </div>
                </div>

                <div className="pt-6 flex justify-end">
                    <button
                        type="submit"
                        className="bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-8 rounded-lg transition-colors cursor-pointer"
                    >
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile