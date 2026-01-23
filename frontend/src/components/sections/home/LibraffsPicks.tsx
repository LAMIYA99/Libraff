"use client";

import PicksCard from "@/components/shared/PicksCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { picksCardImages } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const LibraffsPicks = () => {
  return (
    <section>
      <SectionHeading title="Libraffın seçimləri" highlight="Libraffın" />
      <Swiper
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: {
            slidesPerView: 2.2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="w-full"
      >
        {picksCardImages.map((item) => (
          <SwiperSlide key={item.id}>
            <PicksCard image={item.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default LibraffsPicks;
