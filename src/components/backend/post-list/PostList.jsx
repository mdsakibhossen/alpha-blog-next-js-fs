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
import { useSession } from "next-auth/react";
import { useGetAllUsersQuery } from "@/redux/services/user/userApi";

const PostList = () => {
  const [message, setMessage] = useState({ text: "", isSucceed: true });
  const { removeImage } = useCloudinary();
  const [currentPage, setCurrentPage] = useState(1); // Add state for currentPage
  const { data: session } = useSession();
  // console.log(session?.user._id, "session?.user._id");
  const { data: users = [], isLoading: isUsersLoading } = useGetAllUsersQuery();
  const [user, setUser] = useState("");
  // const [isAllPost, setIsALlPost] = useState(false);

  useEffect(() => {
    if (session?.user?.isAdmin) {
      setUser("");
      // setIsALlPost(session?.user.isAdmin);
    } else {
      setUser(session?.user._id);
    }
  }, [session]);
  // Fetch all posts using RTK Query with pagination
  const {
    data: { posts = [], totalPages = 1 } = {},
    isLoading,
    error,
  } = useGetAllPostsQuery({
    page: currentPage,
    limit: 10,
    user: user,
  }); // Pass currentPage for pagination

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
    <div className="p-3">
      {error ? (
        <h2 className="text-xl text-red-400 text-center">
          {error.message || "Something went wrong..."}
        </h2>
      ) : isLoading ? (
        <h2 className="text-xl text-center">Loading ...</h2>
      ) : (
        <>
          <div className="max-w-[1000px] mx-auto">
            <AlertMessage message={message} />
            {session?.user.isAdmin && (
              <div className="w-full">
                <select
                  name=""
                  id=""
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full lg:w-1/2 bg-slate-200 px-3 py-2 rounded focus:outline-none"
                >
                  <option value="">All Posts</option>{" "}
                  {/* Show all posts if this option is selected */}
                  {isUsersLoading ? (
                    <option>Loading Users...</option>
                  ) : (
                    users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullName}
                      </option>
                    ))
                  )}
                </select>
              </div>
            )}
          </div>
          {posts.length > 0 ? (
            <>
              <div className="table-wrapper max-w-[1000px] mx-auto mt-3 mb-8 overflow-x-auto pb-2">
                <table className="border border-collapse text-center w-full mt-3 min-w-[1000px]">
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

              {totalPages >= 2 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <h2 className="text-2xl text-center">No posts available...</h2>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
