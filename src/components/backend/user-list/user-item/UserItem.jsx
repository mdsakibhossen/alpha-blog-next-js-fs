import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Link from "next/link";
import UserImage from "../../../../../public/images/user.webp";

const UserItem = ({ user, handleDeleteUser }) => {
  // console.log(user,"User");

  const { _id: id, fullName, email, profilePic, isAdmin } = user;

  return (
    <tr className="transition-all duration-300 hover:even:bg-slate-200">
      {/* Full Name */}
      <td className="border p-2 text-center">{fullName}</td>

      {/* Email */}
      <td className="border p-2 text-center">
        <Link
          href={`mailto:${email}`}
          className="text-blue-500 hover:underline"
        >
          {email}
        </Link>
      </td>

      {/* Image */}
      <td className="border p-2 text-center">
        <div className="img-box w-20 h-20 mx-auto flex justify-center items-center">
          {profilePic?.secure_url ? (
            <Image
              src={profilePic?.secure_url}
              alt={fullName}
              width={200}
              height={200}
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            <Image
              src={UserImage}
              alt={"User Image"}
              width={200}
              height={200}
              className="w-full h-full object-cover"
              priority
            />
          )}
        </div>
      </td>

      {/* Is Admin */}
      <td className="border p-2 text-center">
        {isAdmin ? (
          <span className="text-green-600 flex justify-center items-center text-lg">
            <FaCheck />
          </span>
        ) : (
          <span className="text-red-600 flex justify-center items-center text-xl">
            <IoMdCloseCircleOutline />
          </span>
        )}
      </td>

      {/* Delete Action */}
      <td className="border p-2 text-center">
        <div className="flex justify-center items-center">
          <button
            onClick={() => handleDeleteUser(id, profilePic?.public_id)}
            className="text-red-500 text-2xl"
          >
            <MdDeleteOutline />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserItem;
