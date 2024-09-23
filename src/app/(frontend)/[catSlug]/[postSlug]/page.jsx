import PostDetails from "@/components/post-details-page/post-details/PostDetails";

const PostDetailsPage = ({ params }) => {
  return (
    <>
      <PostDetails postSlug={params?.postSlug} />
    </>
  );
};

export default PostDetailsPage;
