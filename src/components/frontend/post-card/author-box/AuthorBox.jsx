"use client";

import { useGetUserQuery } from "@/redux/services/user/userApi";
import UserImage from "../../../../../public/images/user.webp";
import Link from "next/link";
import Image from "next/image";

const AuthorBox = ({ userId }) => {
const { data: user = {} } = useGetUserQuery(userId);

  return (
    <div className="user">
      <Link
        href={user ? `/author/${user?._id}` : "#"}
        className="flex gap-3 items-center"
      >
        <span className="img-box w-[50px] h-[50px] rounded-full overflow-hidden">
          {user?.profilePic?.secure_url ? (
            <Image
              src={user?.profilePic?.secure_url}
              alt={user?.fullName || "Author Image"}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={UserImage}
              alt={user?.fullName || "Author Image"}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          )}
        </span>
        <span className="">{user?.fullName}</span>
      </Link>
    </div>
  );
};

export default AuthorBox;
