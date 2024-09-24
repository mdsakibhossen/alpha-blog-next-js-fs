"use client";
import { useGetAllCategoriesQuery } from "@/redux/services/category/categoryApi";
import Card from "../Card";
import { useSession } from "next-auth/react";
import { useGetAllPostsQuery } from "@/redux/services/post/postApi";
import { useGetAllUsersQuery } from "@/redux/services/user/userApi";

const CardWrapper = () => {
  const { data: session } = useSession();

  // Fetching categories, users, and posts
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategoriesQuery();
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useGetAllUsersQuery();
  const {
    data: { posts = [] } = {},
    isLoading: postsLoading,
    isError: postsError,
  } = useGetAllPostsQuery({
    user: session ? session?.user._id : "",
  });

  // Ternary for loading and error states
  return (
    <>
      {categoriesLoading || usersLoading || postsLoading ? (
        <div>Loading...</div>
      ) : categoriesError || usersError || postsError ? (
        <div>
          Error:{" "}
          {categoriesError
            ? "Failed to load categories"
            : usersError
            ? "Failed to load users"
            : postsError
            ? "Failed to load posts"
            : "An unknown error occurred"}
        </div>
      ) : (
        <div
          className="grid gap-4 w-full"
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
      )}
    </>
  );
};

export default CardWrapper;
