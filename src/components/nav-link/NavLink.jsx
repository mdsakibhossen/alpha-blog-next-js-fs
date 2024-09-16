"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, isHorizontal = true }) => {
  const pathname = usePathname();
  return isHorizontal ? (
    <Link
      href={href}
      className={`transition-all duration-300 hover:text-green-500 ${
        pathname === href ? "text-green-500" : ""
      }`}
    >
      {children}
    </Link>
  ) : (
    <Link
      href={href}
      className={`w-full block text-center  py-2 rounded transition-all duration-300 hover:bg-green-400 hover:text-white ${
        pathname === href ? "bg-green-400 text-white" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
