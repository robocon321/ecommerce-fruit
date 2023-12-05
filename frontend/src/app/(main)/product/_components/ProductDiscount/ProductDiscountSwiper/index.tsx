"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductDiscountSummaryResponse } from "@/types/response/ProductResponse";
import ProductCard from "./ProductCard";

type ProductDiscountTypeProps = {
  products: ProductDiscountSummaryResponse[];
};

export default function ProductDiscountSwiper(props: ProductDiscountTypeProps) {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {props.products.map((item) => (
        <SwiperSlide key={item.id}>
          <ProductCard {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
