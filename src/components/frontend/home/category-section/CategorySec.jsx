"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/pagination";
import "swiper/css/navigation";
import "./category-sec.css";

// import required modules
// import { Pagination, Navigation } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { useGetAllCategoriesQuery } from "@/redux/services/category/categoryApi";
import CategoryCard from "./category-card/CategoryCard";
const CategorySec = () => {
  const {
    data: categories = [],
    isLoading,
    error,
  } = useGetAllCategoriesQuery();
  return (
    <section className="py-20">
      <div className="container mx-auto px-3 relative">
        <div className="top-bar mb-5 flex justify-between items-center">
          <h2 className="font-semibold text-2xl">Category</h2>
          {/* <div>Slider Button</div> */}
        </div>
        <div className="categories">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            // pagination={{
            //   clickable: true,
            // }}
            navigation={!isLoading}
            breakpoints={{
              600: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {error ? (
              <h2 className="text-xl text-red-400 text-center">
                {error.message || "Something went wrong..."}
              </h2>
            ) : isLoading ? (
              <h2 className="text-xl text-center">Loading ...</h2>
            ) : categories.length > 0 ? (
              <>
                {categories?.map((category) => (
                  <SwiperSlide key={category._id}>
                    <CategoryCard category={category} />
                  </SwiperSlide>
                ))}
              </>
            ) : (
              <h2 className="text-2xl text-center">
                No Categories available...
              </h2>
            )}
            {/* <SwiperSlide>
              <div className="card w-full sm:px-16 flex justify-center items-center">
                A
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card w-full sm:px-16 flex justify-center items-center">
                B
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card w-full sm:px-16 flex justify-center items-center">
                C
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CategorySec;
