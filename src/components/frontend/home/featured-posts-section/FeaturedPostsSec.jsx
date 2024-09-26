"use client";
import { useGetAllPostsQuery } from "@/redux/services/post/postApi";
import PostCard from "../../post-card/PostCard";

const FeaturedPostsSec = () => {
  const {
    data: { posts = [] } = {},
    isLoading,
    error,
  } = useGetAllPostsQuery({ page: 1, limit: 4, isFeatured: true });

  return (
    <section className="pb-20">
      <div className="container mx-auto px-3 relative">
        <div className="top-bar mb-5 flex justify-between items-center">
          <h2 className="font-semibold text-2xl">Featured Posts</h2>
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
      </div>
    </section>
  );
};

export default FeaturedPostsSec;
