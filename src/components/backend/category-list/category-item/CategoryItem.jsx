import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const CategoryItem = ({ category, handleDeleteCategory }) => {
  const { _id: id, title, slug, icon } = category;
  return (
    <tr className="transition-all duration-300 hover:even:bg-slate-200">
      <td className="border p-2 text-center">{title}</td>
      <td className="border p-2 text-center">{slug}</td>
      <td className="border p-2 text-center">
        <div className="img-box w-20 h-20 mx-auto">
          <Image
            src={icon.secure_url}
            alt={title}
            width={200}
            height={200}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </td>
      <td className="border p-2 text-center">
        <div className="flex justify-center items-center">
          <Link
            href={`/admin/edit-category/${id}`}
            className="text-green-500 text-xl "
          >
            <FaRegEdit />
          </Link>
        </div>
      </td>
      <td className="border p-2 text-center">
        <div className="flex justify-center items-center">
          <button
            onClick={() => handleDeleteCategory(id, icon.public_id)}
            className="text-red-500 text-2xl"
          >
            <MdDeleteOutline />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryItem;
