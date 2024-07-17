import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import PlusIcon from "../../../../../assets/icons/plus.svg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { useGlobalContext } from "@/ContextApi";

export default function SwiperSelection() {
  const {
    darkModeObject: { darkMode, setDarkMode },
  } = useGlobalContext();
  return (
    <>
      <div
        className={`${darkMode[1].isSelected ? "bg-[#151419] text-white" : "bg-white"} p-3 rounded-lg flex gap-5`}
      >
        <div className="overflow-x-auto w-full">
          <Swiper
            slidesPerView="auto"
            spaceBetween={10}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode]}
            className="mySwiper"
                  >
            <SwiperSlide className="bg-[#9588e8] p-1 rounded-md w-20 text-white">All</SwiperSlide>
            <SwiperSlide className="text-gray-400">javaSript exercise</SwiperSlide>
            <SwiperSlide className="text-gray-400">react exercise</SwiperSlide>
            <SwiperSlide className="text-gray-400">react exercise</SwiperSlide>
            <SwiperSlide className="text-gray-400">react exercise</SwiperSlide>
            <SwiperSlide className="text-gray-400">react exercise</SwiperSlide>
            <SwiperSlide className="text-gray-400">react exercise</SwiperSlide>
            <SwiperSlide className="text-gray-400">react exercise</SwiperSlide>
            <SwiperSlide className="text-gray-400">react exercise</SwiperSlide>
            <SwiperSlide className="text-gray-400">react exercise</SwiperSlide>
          </Swiper>
        </div>
        <button className="bg-black p-1 rounded-md px-3 flex gap-1 items-center text-white">
          <PlusIcon className="w-6 h-6" />
          <span>Tag</span>
        </button>
      </div>
    </>
  );
}
