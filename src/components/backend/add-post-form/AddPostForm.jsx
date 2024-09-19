"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import AlertMessage from "@/components/alert-message/AlertMessage";
import { useCloudinary } from "@/hooks/useCloudinary";
import { useAddPostMutation } from "@/redux/services/post/postApi";
import { useSelector, useDispatch } from "react-redux";
import { setPost, resetPost } from "@/redux/features/post/postSlice";
import { useGetAllCategoriesQuery } from "@/redux/services/category/categoryApi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddPostForm = () => {
  const { image, uploadImage, removeImage, isUploading, isRemoving } =
    useCloudinary();
  const [message, setMessage] = useState({ text: "", isSucceed: true });
  const router = useRouter();
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const { title, slug, description, category, isFeatured } = postState;
  const { data: session } = useSession();

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery();
  const [
    addPost,
    {
      data: addMessage,
      isError: isAddError,
      isLoading: isAddLoading,
      isSuccess: isAddSuccess,
      error: addError,
    },
  ] = useAddPostMutation();

  const getUserId = () => {
    // console.log(session, "S");
    if (session?.user) {
      return session?.user._id;
    }
  };
  useEffect(() => {
    if (isAddSuccess) {
      setMessage({
        text: addMessage?.message || "Post added successfully.",
        isSucceed: true,
      });
      setTimeout(() => {
        router.push("/dashboard/posts");
        dispatch(resetPost());
      }, 1000); // Delay before redirecting
    } else if (isAddError) {
      setMessage({
        text: addError?.data?.message || "Failed to add post.",
        isSucceed: false,
      });
    }
  }, [isAddSuccess, isAddError, addMessage, addError, dispatch, router]);

  const handleChange = (e) => {
    dispatch(setPost({ property: e.target.name, value: e.target.value }));
  };

  //   const handleCategoryChange = (e) => {
  //     dispatch(setPost({ property: "category", value: e.target.value }));
  //   };

  // const handleImageUpload = (e) => {
  //   uploadImage(e.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !slug || !description || !category || !image) {
      setMessage({
        text: "Please fill all fields.",
        isSucceed: false,
      });
      return;
    }
    const user = getUserId();

    const newPost = {
      title,
      slug,
      description,
      category,
      user,
      image,
      isFeatured,
    };
    await addPost(newPost);
  };

  return (
    <div className="post-form max-w-[800px] mx-auto">
      <div className="mb-2">
        <AlertMessage message={message} />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border-2 border-gray-300 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="slug">Slug:</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={slug}
            onChange={handleChange}
            placeholder="Slug"
            className="w-full border-2 border-gray-300 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full border-2 border-gray-300 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded p-2"
          >
            <option value="">Select a category</option>
            {isCategoriesLoading ? (
              <option>Loading...</option>
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
          <label htmlFor="image">Image:</label>
          {isUploading ? (
            <p>Uploading image...</p>
          ) : image ? (
            <div className="relative w-[200px] h-[200px]">
              <button
                type="button"
                onClick={() => removeImage(image.public_id)}
                className="absolute top-2  right-2 bg-white rounded-full p-1"
              >
                <IoCloseSharp />
              </button>
              <Image
                src={image.secure_url}
                alt="Selected"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={uploadImage}
              className="border-2 border-gray-300 rounded p-2"
            />
          )}
          {isRemoving && <p>Removing image...</p>}
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
          <label htmlFor="iseFeatured">Featured</label>
        </div>

        <div className="btn-box text-center">
          <button
            type="submit"
            disabled={isUploading || isAddLoading}
            className={`mt-4 py-2 px-4 rounded bg-blue-500 text-white ${
              isUploading || isAddLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            } transition`}
          >
            {isUploading
              ? "Uploading..."
              : isAddLoading
              ? "Adding..."
              : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
