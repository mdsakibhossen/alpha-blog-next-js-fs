import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-1">
        <div className="img-box w-10 h-10 rounded-full border border-green-400">
          <Link href={"/profile"}>
            {/* <Image /> */}
          </Link>
        </div>
        <div className="name hidden lg:block">
          <Link href={"/profile"}>Name</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
