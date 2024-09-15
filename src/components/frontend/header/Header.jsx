"use client";
import Logo from "@/components/logo/Logo";
import Nav from "./nav/Nav";
import MobileNav from "./nav/MobileNav";
import MenuButton from "./menu-button/MenuButton";
import { useState } from "react";

const Header = () => {
    const [isMenuOpened,setIsMenuOpened] = useState(false);
  return (
    <header className="header w-full sticky top-0 left-0 z-50 border-b border-b-gray-200">
      <div className="container mx-auto px-3 py-5 flex justify-between items-center">
        <Logo />
        <Nav />
        <MobileNav isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened}  />
        <MenuButton isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened} />
      </div>
    </header>
  );
};

export default Header;
