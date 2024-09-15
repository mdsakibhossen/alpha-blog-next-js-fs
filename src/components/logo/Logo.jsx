import Link from "next/link"

const Logo = () => {
  return (
    <Link href={"/"} className="font-medium text-xl relative z-50">
      <span className="text-green-400 font-semibold">Alpha</span>Blog
    </Link>
  );
}

export default Logo