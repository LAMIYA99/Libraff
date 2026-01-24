"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const books = [
  "https://www.libraff.az/images/abt__ut2/banners/all/1319/Banner_Desktop_uz25-09.webp",
  "https://www.libraff.az/images/abt__ut2/banners/all/1305/banner_updated_aze_desktop.webp",
];

export default function BookSwiper() {
  return (
    <div className="relative pb-12">
      <Swiper
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !w-2 !h-2 !bg-gray-400 !opacity-100 !rounded-full",
          bulletActiveClass:
            "swiper-pagination-bullet-active !w-12 !h-2 !rounded-full !bg-gray-700",
        }}
        modules={[Pagination]}
        className="mySwiper h-75 md:h-125 w-full"
      >
        {books.map((book, index) => (
          <SwiperSlide key={index} className="w-full">
            <Image
              src={book}
              alt={`Book ${index + 1}`}
              fill
              className="w-full h-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
