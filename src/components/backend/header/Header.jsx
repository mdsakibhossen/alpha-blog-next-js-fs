import Logo from "@/components/logo/Logo";
import Nav from "./nav/Nav";

const Header = () => {
  return (
    <header className="header w-full sticky top-0 left-0 z-50 border-b border-b-gray-200 bg-white">
      <div className="container mx-auto px-3 py-5 flex justify-between items-center">
        <Logo />
        <Nav />
      </div>
    </header>
  );
}

export default Header