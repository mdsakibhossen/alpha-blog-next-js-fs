"use client";

import LogoutButton from "@/components/logout-button/LogoutButton";
import NavLink from "@/components/nav-link/NavLink";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const { data } = useSession();

  return (
    <aside className="min-w-[200px] min-h-full bg-slate-200 p-3 overflow-y-auto flex flex-col gap-1.5 font-medium text-lg">
      <NavLink href={"/dashboard"} isHorizontal={false}>
        Dashboard
      </NavLink>
      <NavLink href={"/dashboard/profile"} isHorizontal={false}>
        Profile
      </NavLink>
      {data?.user?.isAdmin && (
        <>
          <NavLink href={"/admin/user-list"} isHorizontal={false}>
            Users
          </NavLink>
          <NavLink href={"/admin/categories"} isHorizontal={false}>
            Categories
          </NavLink>
        </>
      )}
      <NavLink href={"/dashboard/posts"} isHorizontal={false}>
        Posts
      </NavLink>
      <div className="btn-box text-center mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
