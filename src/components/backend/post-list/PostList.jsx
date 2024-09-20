"use client";

import {
  useDeletePostMutation,
  useGetAllPostsQuery,
} from "@/redux/services/post/postApi";
import PostItem from "./post-item/PostItem";
import AlertMessage from "@/components/alert-message/AlertMessage";
import { useEffect, useState } from "react";
import { useCloudinary } from "@/hooks/useCloudinary";
import Pagination from "@/components/pagination/Pagination";

const PostList = () => {
  const [message, setMessage] = useState({ text: "", isSucceed: true });
  const { removeImage } = useCloudinary();
  const [currentPage, setCurrentPage] = useState(1); // Add state for currentPage

  // Fetch all posts using RTK Query with pagination
  const {
    data: { posts = [], totalPages = 1 } = {},
    isLoading,
    error,
  } = useGetAllPostsQuery({ page: currentPage }); // Pass currentPage for pagination

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

  // Handle post deletion messages
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
        text: deleteError?.data?.message || "Failed to delete post.",
        isSucceed: false,
      });
    }
  }, [isDeleting, isDeleteSuccess, isDeleteError, deleteMessage, deleteError]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Set currentPage state
    }
  };

  // Handle post and image deletion
  const handleDeletePost = async (id, public_id) => {
    try {
      if (public_id) {
        removeImage(public_id); // Remove image first
      }
      await deletePost(id); // Then delete the post
    } catch (error) {
      setMessage({
        text: "Failed to delete image or post.",
        isSucceed: false,
      });
    }
  };

  return (
    <div>
      {error ? (
        <h2 className="text-xl text-red-400 text-center">
          {error.message || "Something went wrong..."}
        </h2>
      ) : isLoading ? (
        <h2 className="text-xl text-center">Loading ...</h2>
      ) : posts.length > 0 ? (
        <>
          <div className="table-wrapper max-w-[1000px] mx-auto mt-3 mb-8">
            <AlertMessage message={message} />
            <table className="border border-collapse text-center w-full mt-3">
              <thead>
                <tr className="bg-slate-500 text-white uppercase">
                  <th className="border font-medium p-2">Title</th>
                  <th className="border font-medium p-2">Slug</th>
                  <th className="border font-medium p-2">Category</th>
                  <th className="border font-medium p-2">Description</th>
                  <th className="border font-medium p-2">Image</th>
                  <th className="border font-medium p-2">Is Featured</th>
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

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <h2 className="text-2xl text-center">No posts available...</h2>
      )}
    </div>
  );
};

export default PostList;
