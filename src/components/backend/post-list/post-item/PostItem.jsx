import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useGetCategoryQuery } from "@/redux/services/category/categoryApi"; // Import the hook
import { FaCheck } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
const PostItem = ({ post, handleDeletePost }) => {
  const {
    _id: id,
    title,
    slug,
    category: categoryId,
    image,
    isFeatured,
    description,
  } = post;

  // Fetch category title using categoryId
  const {
    data: { category } = {},
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useGetCategoryQuery(categoryId);
  // console.log(category,"Cat");

  const categoryTitle = categoryError
    ? "Failed to fetch"
    : category?.title || "No Category";

  return (
    <tr className="transition-all duration-300 hover:even:bg-slate-200">
      {/* Title */}
      <td className="border p-2 text-center">{title}</td>

      {/* Slug */}
      <td className="border p-2 text-center">{slug}</td>

      {/* Category Title */}
      <td className="border p-2 text-center">
        {isCategoryLoading ? "Loading..." : categoryTitle}
      </td>

      {/* Description */}
      <td className="border p-2 text-center">
        {description || "No description"}
      </td>

      {/* Featured Image */}
      <td className="border p-2 text-center">
        <div className="img-box w-20 h-20 mx-auto">
          {image?.secure_url ? (
            <Image
              src={image?.secure_url}
              alt={title}
              width={200}
              height={200}
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            "No image"
          )}
        </div>
      </td>

      {/* Is Featured */}
      <td className="border p-2 text-center">
        {isFeatured ? (
          <span className="text-green-600 flex justify-center items-center text-lg">
            <FaCheck />
          </span>
        ) : (
          <span className="text-red-600 flex justify-center items-center text-xl">
            <IoMdCloseCircleOutline />
          </span>
        )}
      </td>

      {/* Edit Action */}
      <td className="border p-2 text-center">
        <div className="flex justify-center items-center">
          <Link
            href={`/dashboard/edit-post/${id}`}
            className="text-green-500 text-xl "
          >
            <FaRegEdit />
          </Link>
        </div>
      </td>

      {/* Delete Action */}
      <td className="border p-2 text-center">
        <div className="flex justify-center items-center">
          <button
            onClick={() => handleDeletePost(id, image?.public_id)}
            className="text-red-500 text-2xl"
          >
            <MdDeleteOutline />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PostItem;
