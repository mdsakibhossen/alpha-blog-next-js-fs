"use client";
import { useGetAllCategoriesQuery } from "@/redux/services/category/categoryApi";
import Link from "next/link";

const Footer = () => {
  const { data: cats = [] } = useGetAllCategoriesQuery();
  const categories = cats.filter((_, i) => i < 5);
  return (
    <footer className="bg-slate-200">
      <div className="container mx-auto px-3 py-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        <div className="col">
          <h3 className="font-medium text-lg mb-2.5">About</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
        </div>
        <div className="col">
          <h3 className="font-medium text-lg mb-2.5">Quick Links</h3>
          <div className="links flex flex-col gap-2">
            <Link href={"/"}>Home</Link>
            <Link href={"/about-us"}>About</Link>
            <Link href={"/"}>Blog</Link>
            <Link href={"/contact-us"}>Contact</Link>
          </div>
        </div>
        <div className="col">
          <h3 className="font-medium text-lg mb-2.5">Category</h3>
          <div className="links flex flex-col gap-2">
            {categories &&
              categories.map((category) => (
                <Link key={category?._id} href={`/${category?.slug}`}>
                  {category?.title}
                </Link>
              ))}
          </div>
        </div>
        <div className="col">
          <div className="card bg-white p-4 rounded">
            <h3 className="font-medium text-lg text-center">
              Weekly Newsletter
            </h3>
            <p className="text-slate-300 text-center">
              Get blog articles and offers via email
            </p>
            <div className="mt-5">
              <input
                type="email"
                className="w-full bg-gray-200 px-3 py-2 focus:outline-green-500 rounded"
                placeholder="Your Email"
              />
              <button className="w-full py-2 bg-blue-600 mt-3 rounded text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
