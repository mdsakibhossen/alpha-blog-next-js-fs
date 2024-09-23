"use client";

import { useGetPostQuery } from "@/redux/services/post/postApi";
import PostView from "../post-view/PostView";

const PostDetails = ({ postSlug }) => {
  const { data: { post } = {}, error, isLoading } = useGetPostQuery(postSlug);
  //   console.log("post:", post);

  return (
    <section className="post-details py-20">
      <div className="container mx-auto px-3">
        {error ? (
          <h2 className="text-xl text-red-400 text-center">
            {error.message || "Something went wrong..."}
          </h2>
        ) : isLoading ? (
          <h2 className="text-xl text-center">Loading ...</h2>
        ) : post ? (
          <PostView post={post} />
        ) : (
          <h2 className="text-2xl text-center">No Post available...</h2>
        )}
      </div>
    </section>
  );
};

export default PostDetails;
