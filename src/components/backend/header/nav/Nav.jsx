"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import UserImage from "../../../../../public/images/user.webp";

const Nav = () => {
  const { data } = useSession();
  return (
    <nav>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-1">
        <div className="img-box w-10 h-10 rounded-full border border-green-400 overflow-hidden">
          <Link href={"/dashboard/profile"}>
            <Image
              src={
                data?.user?.profilePic?.secure_url
                  ? data?.user?.profilePic?.secure_url
                  : UserImage
              }
              alt={data?.user?.fullName || "Image"}
              width={200}
              height={200}
              className="w-full h-full object-cover"
              priority
            />
          </Link>
        </div>
        <div className="name hidden lg:block">
          <Link href={"/dashboard/profile"}>{data?.user.fullName}</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
