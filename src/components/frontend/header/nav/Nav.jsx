"use client";
import LogoutButton from "@/components/logout-button/LogoutButton";
import NavLink from "@/components/nav-link/NavLink";
import { useSession } from "next-auth/react";

const Nav = () => {
  const { status } = useSession();
  return (
    <nav className="hidden lg:flex gap-6 items-center">
      <NavLink href={"/"}>Home</NavLink>
      <NavLink href={"/about-us"}>About Us</NavLink>
      <NavLink href={"/contact-us"}>Contact Us</NavLink>

      {status === "authenticated" && (
        <>
          <NavLink href={"/dashboard"}>Dashboard</NavLink>
          <LogoutButton />
        </>
      )}

      {status === "unauthenticated" && (
        <>
          <NavLink href={"/login"}>Login</NavLink>
          <NavLink href={"/sign-up"}>Sign Up</NavLink>
        </>
      )}
    </nav>
  );
};

export default Nav;
