"use client";
import Pagination from "@/components/pagination/Pagination";
import { useGetAllPostsQuery } from "@/redux/services/post/postApi";
import { useState } from "react";
import PostCard from "../../post-card/PostCard";
import { useGetCategoryQuery } from "@/redux/services/category/categoryApi";

const PostsSec = ({ catSlug }) => {
  const { data: { category } = {} } = useGetCategoryQuery(catSlug);
  const [currentPage, setCurrentPage] = useState(1); // Add state for currentPage
//   console.log(category, "Cat");

  const {
    data: { posts = [], totalPages = 1 } = {},
    isLoading,
    error,
  } = useGetAllPostsQuery({
    page: currentPage,
    limit: 8,
    category: category ? category._id : "",
  });

  // const {
  //   data: { posts = [], totalPages = 1 } = {},
  //   isLoading,
  //   error,
  // } = useGetAllPostsQuery({ page: 1, limit: 8, isFeatured: true }); // for Featured Posts

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Set currentPage state
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-3 relative">
        <div className="top-bar mb-5 flex justify-between items-center">
          <h2 className="font-semibold text-2xl">All posts</h2>
        </div>
        {error ? (
          <h2 className="text-xl text-red-400 text-center">
            {error.message || "Something went wrong..."}
          </h2>
        ) : isLoading ? (
          <h2 className="text-xl text-center">Loading ...</h2>
        ) : posts.length > 0 ? (
          <div
            className="all-post grid gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(20rem,1fr))",
            }}
          >
            {posts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <h2 className="text-2xl text-center">No Posts are available...</h2>
        )}

        {totalPages >= 2 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default PostsSec;
