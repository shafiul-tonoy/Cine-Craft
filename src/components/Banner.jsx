import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import movie1 from "../assets/1917.jpeg";
import movie2 from "../assets/batman.jpg";
import movie3 from "../assets/alice.jpg";

export default function Banner() {
  const images = [movie1, movie2, movie3];
  const texts = [
    "1917",
    "The Dark Night" , 
    "Alice in wonderland" 
  ];
  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30} // Space between slides
        slidesPerView={1} // Number of visible slides
        navigation // Enable navigation arrows
        pagination={{ clickable: true }} // Enable pagination dots
        autoplay={{ delay: 3000 }} // Enable autoplay
        loop // Enables infinite looping
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[70vh] object-cover object-top"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <h2 className="text-white text-4xl font-bold">
                {texts[index]}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
