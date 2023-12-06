import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type ImageSliderPropsType = {
    images: string[]
}

export default function ImageSlider(props: ImageSliderPropsType) {
    const { images } = props;
    const [index, setIndex] = useState(0);

    return (
        <div className="product__details__pic">
        <div className="product__details__pic__item">
          <img
            className="product__details__pic__item--large"
            src={images[index]}
            alt=""
          />
        </div>
        <div className="product__details__pic__slider owl-carousel">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {images.map((item, index) => (
              <SwiperSlide key={index} onClick={() => setIndex(index)}>
                <img
                  src={item}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
}