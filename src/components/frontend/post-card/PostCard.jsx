import { useGetCategoryQuery } from "@/redux/services/category/categoryApi";
import { useGetUserQuery } from "@/redux/services/user/userApi";
import Image from "next/image";
import Link from "next/link";
import AuthorBox from "./author-box/AuthorBox";
import { getDate } from "@/utils/getDate";

const PostCard = ({ post }) => {
  const {
    image,
    title,
    description,
    category: catId,
    slug: postSlug,
  } = post;
  const { data: { category } = {} } = useGetCategoryQuery(catId);
 
  // console.log(category, "Category Data");

  return (
    <div className="post-card rounded overflow-hidden shadow">
      <div className="img-box w-auto h-[250px]">
        <Link
          href={
            category?.slug && postSlug ? `/${category.slug}/${postSlug}` : "#"
          }
        >
          <Image
            src={image.secure_url}
            alt={title}
            width={600}
            height={250}
            className="w-full h-full object-cover"
            priority
          />
        </Link>
      </div>
      <div className="info p-5 bg-gray-50">
        {category?.title && category?.slug && (
          <div className="category my-3">
            <Link
              href={`/${category?.slug}/`}
              className="text-blue-600 bg-blue-100/60 px-5 py-2.5 rounded"
            >
              {" "}
              {category?.title}
            </Link>{" "}
          </div>
        )}

        <h3 className="text-lg font-semibold uppercase mt-5">
          <Link
            href={
              category?.slug && postSlug ? `/${category.slug}/${postSlug}` : "#"
            }
          >
            {title.length > 100 ? `${title.slice(0, 100)}...` : title}
          </Link>
        </h3>
        {/* TODO: User and Date will be added here */}
        <p className="text-slate-500">
          {description.length > 200
            ? `${description.slice(0, 200)}...`
            : description}
        </p>
        <div className="mt-3 flex justify-between items-center text-slate-400">
          {post?.user && <AuthorBox userId={post?.user} />}
          <p>{getDate(post?.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
