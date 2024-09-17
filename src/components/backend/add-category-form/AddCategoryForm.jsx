"use client";
import AlertMessage from "@/components/alert-message/AlertMessage";
import { useCloudinary } from "@/hooks/useCloudinary";
import { setCategory } from "@/redux/features/category/categorySlice";
import { useAddCategoryMutation } from "@/redux/services/category/categoryApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const AddCategoryForm = () => {
  const { image, uploadImage, removeImage, isUploading, isRemoving } =
    useCloudinary();
  const [message, setMessage] = useState({ text: "", isSucceed: true });
  const router = useRouter();
  const dispatch = useDispatch();
  const categoryStates = useSelector((storeStates) => storeStates.category);
  const { title, slug } = categoryStates;

  const [
    addCategory,
    {
      data: addMessage,
      isError: isAddError,
      isLoading: isAddLoading,
      isSuccess: isAddSuccess,
      error: addError,
    },
  ] = useAddCategoryMutation();

  const changeHandler = (e) => {
    dispatch(setCategory({ property: e.target.name, value: e.target.value }));
  };
  // console.log(categoryStates, "CategoryStates");

  // Handle messages based on RTK Query states
  useEffect(() => {
    if (isAddSuccess) {
      setMessage({
        text: addMessage?.message || "Successfully Added...",
        isSucceed: true,
      });
      router.push("/admin/categories");
    } else if (isAddError) {
      // console.log("addError?.data?.message:", addError?.data?.message);
      setMessage({
        text: addError?.data?.message || "Failed To Add...",
        isSucceed: false,
      });
    }
  }, [isAddSuccess, isAddError, addError, dispatch]);

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // console.log(title,slug,image, "Inputvalue");

    if (!title || !slug || !image) {
      setMessage({
        text: "Please Fill All The Fields...",
        isSucceed: false,
      });
      return;
    }

    const newCategory = { title, slug, icon: image };
    await addCategory(newCategory);
  };
  return (
    <div className="category-form max-w-[600px] mx-auto">
      <div className="mb-2">
        <AlertMessage message={message} />
      </div>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title: </label>
          <input
            onChange={changeHandler}
            value={title && title}
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
            onChange={changeHandler}
            value={slug && slug}
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
          {isRemoving && (
            <p className="text-blue-600">Please wait image is Removing...</p>
          )}
        </div>

        <div className="btn-box mt-3 text-center">
          <button
            disabled={isUploading || isAddLoading}
            className={`bg-blue-400 transition-all duration-300 hover:bg-blue-500 active:bg-blue-600 px-8 py-2.5 rounded text-white ${
              isUploading || isAddLoading ? "cursor-not-allowed" : ""
            }`}
          >
            {isUploading
              ? "Uploading Image..."
              : isAddLoading
              ? "Loading..."
              : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
