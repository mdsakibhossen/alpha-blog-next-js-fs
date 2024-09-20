"use client";
import AlertMessage from "@/components/alert-message/AlertMessage";
import { useCloudinary } from "@/hooks/useCloudinary";
import { setPost } from "@/redux/features/post/postSlice";
import {
  useEditPostMutation,
  useGetPostQuery,
} from "@/redux/services/post/postApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCategoriesQuery } from "@/redux/services/category/categoryApi";

const EditPostForm = ({ id }) => {
  const { data } = useGetPostQuery(id);
  const { image, setImage, uploadImage, removeImage, isUploading, isRemoving } =
    useCloudinary();
  const [message, setMessage] = useState({ text: "", isSucceed: true });
  const router = useRouter();
  const dispatch = useDispatch();
  const postStates = useSelector((storeStates) => storeStates.post);
  const { title, slug, description, category, isFeatured } = postStates;

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery();

  useEffect(() => {
    if (data?.post) {
      dispatch(setPost({ property: "title", value: data.post.title }));
      dispatch(setPost({ property: "slug", value: data.post.slug }));
      dispatch(
        setPost({ property: "description", value: data.post.description })
      );
      dispatch(setPost({ property: "category", value: data.post.category._id }));
      dispatch(
        setPost({ property: "isFeatured", value: data.post.isFeatured })
      );
      setImage(data.post.image);
    }
  }, [data, dispatch]);
  

  const [
    editPost,
    {
      data: editMessage,
      isError: isEditError,
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      error: editError,
    },
  ] = useEditPostMutation();

  const changeHandler = (e) => {
    dispatch(setPost({ property: e.target.name, value: e.target.value }));
  };

  useEffect(() => {
    if (isEditSuccess) {
      setMessage({
        text: editMessage?.message || "Successfully Updated...",
        isSucceed: true,
      });
      setTimeout(() => {
        router.push("/dashboard/posts");
      }, 1000);
    } else if (isEditError) {
      setMessage({
        text: editError?.data?.message || "Failed To Update...",
        isSucceed: false,
      });
    }
  }, [isEditSuccess, isEditError, editError, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !slug || !description || !category || !image) {
      setMessage({
        text: "Please Fill All The Fields...",
        isSucceed: false,
      });
      return;
    }

    const updatedPost = {
      title,
      slug,
      description,
      category,
      user: data?.post.user,
      image,
      isFeatured,
    };
    await editPost({ id: data?.post._id, post: updatedPost });
  };

  return (
    <div className="post-form max-w-[600px] mx-auto">
      <div className="mb-2">
        <AlertMessage message={message} />
      </div>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title: </label>
          <input
            onChange={changeHandler}
            value={title}
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
            value={slug}
            type="text"
            name="slug"
            id="slug"
            placeholder="Slug"
            className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description: </label>
          <textarea
            onChange={changeHandler}
            value={description}
            name="description"
            id="description"
            placeholder="Description"
            rows="4"
            className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category">Category: </label>
          <select
            onChange={changeHandler}
            value={category}
            name="category"
            id="category"
            className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 p-2 rounded"
          >
            <option value="">Select a category</option>
            {isCategoriesLoading ? (
              <option>Loading categories...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="image">Image: </label>
          {isUploading ? (
            <p className="text-blue-600">Please wait, image is uploading...</p>
          ) : image ? (
            <div className="post-img w-[180px] h-[180px] mx-auto p-3 relative">
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
                priority
              />
            </div>
          ) : (
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={uploadImage}
              className="w-full outline-none border-2 border-transparent focus:border-green-400 bg-gray-100 p-2 rounded"
            />
          )}
          {isRemoving && (
            <p className="text-blue-600">Please wait, image is removing...</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={isFeatured}
            onChange={(e) =>
              dispatch(
                setPost({ property: e.target.name, value: e.target.checked })
              )
            }
            className="form-checkbox"
          />
          <label htmlFor="isFeatured">Featured</label>
        </div>
        <div className="btn-box mt-3 text-center">
          <button
            disabled={isUploading || isEditLoading}
            className={`bg-green-400 transition-all duration-300 hover:bg-green-500 active:bg-green-600 px-8 py-2.5 rounded text-white ${
              isUploading || isEditLoading ? "cursor-not-allowed" : ""
            }`}
          >
            {isUploading
              ? "Uploading Image..."
              : isEditLoading
              ? "Loading..."
              : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
