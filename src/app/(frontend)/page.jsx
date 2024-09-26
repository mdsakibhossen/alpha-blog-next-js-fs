import AllPostSec from "@/components/frontend/home/all-post-section/AllPostSec";
import CategorySec from "@/components/frontend/home/category-section/CategorySec";
import FeaturedPostsSec from "@/components/frontend/home/featured-posts-section/FeaturedPostsSec";

const { default: Hero } = require("@/components/frontend/home/hero/Hero");

const HomePage = () => {
  return (
    <>
      <Hero />
      <CategorySec />
      <FeaturedPostsSec />
      <AllPostSec />
    </>
  );
};

export default HomePage;
