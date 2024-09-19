"use client";

import {
  useDeletePostMutation,
  useGetAllPostsQuery,
} from "@/redux/services/post/postApi"; // Adjust this import based on your postApiSlice
import PostItem from "./post-item/PostItem"; // Ensure this component is created to handle each post item
import AlertMessage from "@/components/alert-message/AlertMessage";
import { useEffect, useState } from "react";
import { useCloudinary } from "@/hooks/useCloudinary"; // Assuming images for posts are handled similarly to categories

const PostList = () => {
  const [message, setMessage] = useState({ text: "", isSucceed: true });
  const { removeImage } = useCloudinary();
  const { data: posts = [], isLoading, error } = useGetAllPostsQuery(); // Fetch all posts using RTK query
  //   console.log(posts, "Posts");
  const [
    deletePost,
    {
      data: deleteMessage,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleting,
      error: deleteError,
      isError: isDeleteError,
    },
  ] = useDeletePostMutation();

  useEffect(() => {
    if (isDeleting) {
      setMessage({
        text: "Deleting...",
        isSucceed: true,
      });
    }
    if (isDeleteSuccess) {
      setMessage({
        text: deleteMessage?.message || "Post deleted successfully.",
        isSucceed: true,
      });
    } else if (isDeleteError) {
      setMessage({
        text: deleteError?.data?.message || "Failed To Delete.",
        isSucceed: false,
      });
    }
  }, [isDeleting, isDeleteSuccess, isDeleteError]);

  const handleDeletePost = async (id, public_id) => {
    removeImage(public_id);
    await deletePost(id);
  };

  return (
    <div>
      {error ? (
        <h2 className="text-xl text-red-400 text-center">
          {error.message || "Something Went Wrong..."}
        </h2>
      ) : isLoading ? (
        <h2 className="text-xl text-center">Loading ...</h2>
      ) : posts.length >= 1 ? (
        <div className="table-wrapper max-w-[1000px] mx-auto mt-3">
          <AlertMessage message={message} />
          <table className="border border-collapse text-center w-full mt-3">
            <thead>
              <tr className="bg-slate-500 text-white uppercase">
                <th className="border font-medium p-2">Title</th>
                <th className="border font-medium p-2">Slug</th>
                <th className="border font-medium p-2">Category</th>
                <th className="border font-medium p-2">Image</th>
                <th className="border font-medium p-2" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post) => (
                <PostItem
                  key={post._id}
                  post={post}
                  handleDeletePost={handleDeletePost}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 className="text-2xl text-center">No Posts Are Available...</h2>
      )}
    </div>
  );
};

export default PostList;
