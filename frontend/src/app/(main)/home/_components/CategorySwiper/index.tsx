"use client";

import CategoryResponse from "@/types/response/CategoryResponse";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type CategorySwiperPropsType = {
  categories: CategoryResponse[];
};

export default function CategorySwiper(props: CategorySwiperPropsType) {
  const { categories } = props;
  return (
    <section className="categories">
      <div className="container">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {categories.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="categories__item set-bg"
                style={{
                  backgroundImage: `url(http://localhost:8080/categories/${item.image})`,
                }}
              >
                <h5>
                  <a href="#">{item.name}</a>
                </h5>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
