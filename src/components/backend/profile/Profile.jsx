"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCloudinary } from "@/hooks/useCloudinary";
import { useEditUserMutation } from "@/redux/services/user/userApi";
import AlertMessage from "@/components/alert-message/AlertMessage";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";

const Profile = () => {
  const { data: session } = useSession();

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useEditUserMutation();

  const [fullName, setFullName] = useState("");

  const [message, setMessage] = useState({ text: "", isSucceed: true });

  const { image, setImage, uploadImage, removeImage, isUploading, isRemoving } =
    useCloudinary();

  useEffect(() => {
    if (session?.user) {
      setFullName(session?.user.fullName);
    }
    if (session?.user.profilePic?.secure_url) {
      setImage(session?.user.profilePic);
    }
  }, [session]);

  // console.log(fullName,image);

  useEffect(() => {
    if (isSuccess) {
      setMessage({ text: "Profile successfully updated!", isSucceed: true });
    } else if (isError) {
      setMessage({
        text: error?.data?.message || "Failed to update profile...",
        isSucceed: false,
      });
    }
  }, [isSuccess, isError, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName) {
      setMessage({ text: "Please fill all the fields...", isSucceed: false });
      return;
    }

    const updatedUser = {
      fullName: fullName,
      profilePic: image, // Use updated profilePic from userInfo
    };

    await updateUser({ id: session?.user._id, user: updatedUser });
  };

  return (
    <div className="p-3 w-full max-w-[600px] mx-auto">
      <div className="p-5 w-full">
        {isUploading ? (
          <p className="text-blue-600 text-center">
            Please wait, image is uploading...
          </p>
        ) : image ? (
          <div className="img-box w-[200px] h-[200px] rounded-full border-2 border-green-400 mx-auto flex justify-center items-center overflow-hidden relative">
            <button
              onClick={() => removeImage(image.public_id)}
              type="button"
              className="absolute text-lg bottom-2 left-[50%] translate-x-[-50%] bg-white rounded-full w-8 h-8 flex justify-center items-center"
            >
              <IoCloseSharp />
            </button>
            <Image
              src={image?.secure_url}
              alt={fullName}
              width={200}
              height={200}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        ) : (
          <div className="img-box w-[200px] h-[200px] rounded-full border-2 border-green-400 mx-auto flex justify-center items-center overflow-hidden relative">
            <label
              htmlFor="image"
              className="px-3 py-2 bg-slate-200 rounded border-2 border-slate-300 cursor-pointer"
            >
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={uploadImage}
              hidden
            />
          </div>
        )}
        {isRemoving && (
          <p className="text-blue-600 text-center">
            Please wait, image is removing...
          </p>
        )}
      </div>

      <div className="info">
        <div className="mb-2">
          <AlertMessage message={message} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName">Full Name: </label>
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName} // Ensure it's always a controlled input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter Your Name"
              className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={session?.user.email || ""}
              readOnly
              disabled
              className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 p-2 rounded cursor-not-allowed"
            />
          </div>

          <div className="btn-box mt-3 text-center">
            <button
              disabled={isUploading || isLoading}
              className={`bg-green-400 transition-all duration-300 hover:bg-green-500 active:bg-green-600 px-8 py-2.5 rounded text-white ${
                isUploading || isLoading ? "cursor-not-allowed" : ""
              }`}
            >
              {isUploading
                ? "Uploading Image..."
                : isLoading
                ? "Updating..."
                : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
