"use client";
import AlertMessage from "@/components/alert-message/AlertMessage";
import { useCloudinary } from "@/hooks/useCloudinary";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";

const CategoryForm = () => {
  const { image, uploadImage, removeImage, isUploading,isRemoving } = useCloudinary();

  return (
    <div className="category-form max-w-[600px] mx-auto">
      <div className="mb-2">{/* <AlertMessage message={message} /> */}</div>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="slug">Slug: </label>
          <input
            type="text"
            name="slug"
            id="slug"
            placeholder="Slug"
            className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="icon">Icon: </label>
          {isUploading ? (
            <p className="text-blue-600">Please wait image is uploading...</p>
          ) : image ? (
            <div className="category-img w-[180px] h-[180px] mx-auto p-3 relative">
              <button
                onClick={() => removeImage(image?.public_id)}
                type="button"
                className="absolute text-lg top-4 right-4 bg-white rounded-full w-8 h-8 flex justify-center items-center"
              >
                <IoCloseSharp />
              </button>
              <Image
                src={image?.secure_url}
                alt={image?.public_id}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <input
              type="file"
              name="icon"
              id="icon"
              accept="image/*"
              onChange={uploadImage}
              className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 p-2 rounded"
            />
          )}
          {isRemoving && <p className="text-blue-600">Please wait image is Removing...</p>}
        </div>

        <div className="btn-box mt-3 text-center">
          {/* <button
            className={`bg-blue-400 transition-all duration-300 hover:bg-blue-500 active:bg-blue-600 px-8 py-2.5 rounded text-white`}
          >
            Add
          </button> */}
          <button
            disabled={isUploading}
            className={`bg-blue-400 transition-all duration-300 hover:bg-blue-500 active:bg-blue-600 px-8 py-2.5 rounded text-white ${
              isUploading ? "cursor-not-allowed" : ""
            }`}
          >
            {isUploading ? "Uploading Image..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
