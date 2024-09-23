import AllPostSec from "@/components/frontend/home/all-post-section/AllPostSec";
import CategorySec from "@/components/frontend/home/category-section/CategorySec";

const { default: Hero } = require("@/components/frontend/home/hero/Hero");

const HomePage = () => {
  return (
    <>
      <Hero />
      <CategorySec />
      <AllPostSec />
    </>
  );
};

export default HomePage;
