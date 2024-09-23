import Hero from "@/components/frontend/category-posts-page/hero/Hero"
import PostsSec from "@/components/frontend/category-posts-page/posts-section/PostsSec"

const CategoryPostsPage = ({params}) => {
  // console.log(params?.catSlug, "Cat");
  
  return (
    <>
      <Hero catSlug={params?.catSlug} />
      <PostsSec catSlug={params?.catSlug} />
    </>
  );
}

export default CategoryPostsPage