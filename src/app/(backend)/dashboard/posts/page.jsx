import PostList from "@/components/backend/post-list/PostList"; // Ensure this component is created and renders the post list
import Link from "next/link";

export const metadata = {
  title: "Posts | AlphaBlog",
  description: "Posts Description",
};

const PostsPage = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto px-3 py-5">
        <div className="heading p-3">
          <h1 className="text-2xl text-center uppercase">Posts</h1>
        </div>
        {/* <PostList /> Component for rendering posts */}
        <div className="btn-box text-center mt-10">
          <Link
            href={"/dashboard/add-post"}
            className="py-2.5 px-8 bg-blue-500 text-white rounded"
          >
            Add Post
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PostsPage;
