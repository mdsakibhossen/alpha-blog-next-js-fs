"use client";

import LogoutButton from "@/components/logout-button/LogoutButton";
import NavLink from "@/components/nav-link/NavLink";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";

const Sidebar = () => {
  const { data } = useSession();
  const [sidebarOpened, setSidebarOpened] = useState(true);

  useEffect(() => {
    const sidebarChildren = document.querySelector("#sidebar").children;
    Array.from(sidebarChildren).forEach((el) => {
      if (el.tagName !== "BUTTON") {
        el.addEventListener("click", () => setSidebarOpened(false));
      }
    });
  }, []);

  return (
    <div
      className={`fixed ${
        sidebarOpened ? "translate-x-0" : "translate-x-[-100%]"
      } h-[85vh] xl:translate-x-0 xl:static left-0 transition-all duration-300 z-40`}
    >
      <aside
        id="sidebar"
        className="min-w-[200px] min-h-full bg-slate-200 p-3 overflow-y-auto flex flex-col gap-1.5 font-medium text-lg relative"
      >
        <button
          onClick={() => setSidebarOpened(!sidebarOpened)}
          className={`fixed z-[-1] top-[50%] translate-y-[-50%] right-0 translate-x-[60%] bg-slate-200 w-10 h-14 rounded-full flex justify-center items-center text-3xl xl:hidden`}
        >
          <SlArrowRight />
        </button>
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
    </div>
  );
};

export default Sidebar;
