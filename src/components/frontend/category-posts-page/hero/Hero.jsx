"use client";

import { useGetCategoryQuery } from "@/redux/services/category/categoryApi";

const Hero = ({ catSlug }) => {
  const { data: { category } = {} } = useGetCategoryQuery(catSlug);
  // console.log(category, "category");

  return (
    <section className="hero h-[40vh] bg-slate-800 text-white">
      <div className="container mx-auto px-3 text-center h-full flex items-center justify-center">
        <h2 className="text-4xl uppercase">{category?.title}</h2>
      </div>
    </section>
  );
};

export default Hero;
