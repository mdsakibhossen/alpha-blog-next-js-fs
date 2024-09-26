"use client";

import { useGetUserQuery } from "@/redux/services/user/userApi";
import UserImage from "../../../../../public/images/user.webp"
import Image from "next/image";

const Hero = ({ id }) => {
  const { data: user={} } = useGetUserQuery(id);
//   console.log(user, "user");

  return (
    <section className="hero min-h-[40vh] py-20 bg-slate-800 text-white">
      <div className="container mx-auto px-3 text-center h-full flex items-center justify-center flex-col gap-5">
        <div className="img-box w-[150px] h-[150px] rounded-full overflow-hidden">
          {user?.profilePic?.secure_url ? (
            <Image
              src={user?.profilePic?.secure_url}
              alt={user?.fullName || "Author Image"}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={UserImage}
              alt={user?.fullName || "Author Image"}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <h2 className="text-4xl uppercase text-center">{user?.fullName}</h2>
      </div>
    </section>
  );
};

export default Hero;
