import { useGetCategoryQuery } from "@/redux/services/category/categoryApi";
import { useGetUserQuery } from "@/redux/services/user/userApi";
import Image from "next/image";
import Link from "next/link";
import AuthorBox from "./author-box/AuthorBox";
import { getDate } from "@/utils/getDate";

const PostCard = ({ post }) => {
  const { image, title, description, category: catId, slug: postSlug } = post;
  const { data: { category } = {} } = useGetCategoryQuery(catId);

  // console.log(category, "Category Data");

  return (
    <div className="post-card rounded overflow-hidden shadow max-w-[600px] bg-gray-50">
      <div className="img-box w-full h-[250px]">
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
      <div className="info p-5 bg-gray-50 h-full">
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

        <h3 className="text-lg font-semibold uppercase mt-5 mb-2">
          <Link
            href={
              category?.slug && postSlug ? `/${category.slug}/${postSlug}` : "#"
            }
          >
            {title.length > 40 ? `${title.slice(0, 40)}...` : title}
          </Link>
        </h3>
        {/* TODO: User and Date will be added here */}
        <p className="text-slate-500">
          <Link
            href={
              category?.slug && postSlug ? `/${category.slug}/${postSlug}` : "#"
            }
          >
            {description.length > 120
              ? `${description.slice(0, 120)}...`
              : description}
          </Link>
        </p>
        <div className="mt-5 flex justify-between items-center text-slate-400">
          {post?.user && <AuthorBox userId={post?.user} />}
          <p>{getDate(post?.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
