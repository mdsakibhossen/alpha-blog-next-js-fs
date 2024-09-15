"use client";
import LogoutButton from "@/components/logout-button/LogoutButton";
import NavLink from "@/components/nav-link/NavLink";
import { useSession } from "next-auth/react";

const MobileNav = ({ isMenuOpened, setIsMenuOpened }) => {
  const { status } = useSession();
  return (
    <nav
      className={`flex lg:hidden gap-2 items-center absolute w-full top-0 left-0 z-40 bg-gray-100 h-screen flex-col justify-center text-2xl p-3 transition-all duration-300 origin-left ${
        isMenuOpened ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <NavLink href={"/"} isHorizontal={false}>
        Home
      </NavLink>
      <NavLink href={"/about-us"} isHorizontal={false}>
        About Us
      </NavLink>
      <NavLink href={"/contact-us"} isHorizontal={false}>
        Contact Us
      </NavLink>

      {status === "authenticated" && (
        <>
          <NavLink href={"/dashboard"} isHorizontal={false}>
            Dashboard
          </NavLink>
          <LogoutButton />
        </>
      )}

      {status === "unauthenticated" && (
        <>
          <NavLink href={"/login"} isHorizontal={false}>
            Login
          </NavLink>
          <NavLink href={"/sign-up"} isHorizontal={false}>
            Sign Up
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default MobileNav;
