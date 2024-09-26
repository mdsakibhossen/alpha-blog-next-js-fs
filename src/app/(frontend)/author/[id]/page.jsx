import Hero from "@/components/frontend/author/hero/Hero";
import PostsSec from "@/components/frontend/author/posts-section/PostsSec";

const AuthorPostsPage = ({ params }) => {
  // console.log(params?.catSlug, "Cat");

  return (
    <>
      <Hero id={params?.id} />
      <PostsSec id={params?.id} />
    </>
  );
};

export default AuthorPostsPage;
