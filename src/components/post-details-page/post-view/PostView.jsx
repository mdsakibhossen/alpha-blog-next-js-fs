import AuthorBox from "@/components/frontend/post-card/author-box/AuthorBox";
import { getDate } from "@/utils/getDate";
import Image from "next/image";

const PostView = ({ post }) => {
  const { title, image, description } = post;
  return (
    <>
      <h2 className="mt-3 uppercase font-semibold text-xl sm:text-2xl lg:text-4xl">
        {title}
      </h2>
      <div className="mt-5 mb-8 flex justify-between items-center text-slate-400">
        {post?.user && <AuthorBox userId={post?.user} />}
        <p>{getDate(post?.createdAt)}</p>
      </div>
      <div className="img-box w-full h-[60vh]">
        <Image
          src={image.secure_url}
          alt={title}
          width={2000}
          height={800}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="info mt-5">
        <p>{description}</p>
      </div>
    </>
  );
};

export default PostView;
