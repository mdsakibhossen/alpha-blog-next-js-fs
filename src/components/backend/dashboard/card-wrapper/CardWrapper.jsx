"use client";
import { useGetAllCategoriesQuery } from "@/redux/services/category/categoryApi";
import Card from "../Card";
import { useSession } from "next-auth/react";
import { useGetAllPostsQuery } from "@/redux/services/post/postApi";
import { useGetAllUsersQuery } from "@/redux/services/user/userApi";

const CardWrapper = () => {
  const { data: session } = useSession();
  const { data: categories = [] } = useGetAllCategoriesQuery();
  const { data: users = [] } = useGetAllUsersQuery();
  const { data: { posts = [] } = {} } = useGetAllPostsQuery({
    user: session ? session?.user._id : "",
  });

  return (
    <div
      className="grid gap-4  w-full"
      style={{ gridTemplateColumns: "repeat(auto-fit,minmax(20rem,1fr))" }}
    >
      {session?.user.isAdmin && (
        <>
          <Card
            title={"User"}
            number={users?.length}
            colorClass="bg-purple-500 text-white border-purple-800"
          />
          <Card
            title={"Category"}
            number={categories?.length}
            colorClass="bg-blue-500 text-white border-blue-800"
          />
        </>
      )}
      <Card
        title={"Post"}
        number={posts?.length}
        colorClass="bg-red-500 text-white border-red-800"
      />
    </div>
  );
};

export default CardWrapper;
