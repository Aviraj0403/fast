'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';

const indianCities = [
  { name: 'Hyderabad', img: '/image/hyderabad-city.jpg' },
  { name: 'Kolkata', img: '/image/kolkata-city.jpg' },
  { name: 'Jaipur', img: '/image/jaipur-city.jpg' },
  { name: 'Chennai', img: '/image/chennai-city.jpg' },
  { name: 'Indore', img: '/image/indore-city.jpg' },
  { name: 'Mumbai', img: '/image/mumbai-city.jpg' },
  { name: 'Bangalore', img: '/image/bangalore-city.jpg' },
  { name: 'Lucknow', img: '/image/lucknow-city.jpg' },
  { name: 'Delhi', img: '/image/delhi-city.jpg' },
  { name: 'Pune', img: '/image/pune-city.jpg' },
//   { name: 'Ahmedabad', img: '/image/ahmedabad-city.jpg' },
  { name: 'Bhopal', img: '/image/bhopal-city.jpg' },
//   { name: 'Surat', img: '/image/surat-city.jpg' },
  { name: 'Chandigarh', img: '/image/chandigarh-city.jpg' },
  { name: 'Patna', img: '/image/patna-city.jpg' },
];

const StudyPlacesSection = () => {
  return (
    <section className="w-full bg-blue-700 py-10 px-4">
      <h2 className="text-white text-center text-2xl md:text-3xl font-bold mb-6">
        Top Study Places for BE/B.Tech
      </h2>
      <hr className="border-white mb-6 max-w-xl mx-auto" />
      <Swiper
        slidesPerView={2}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
      >
        {indianCities.map((city, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-32 md:h-36 lg:h-40 rounded-lg overflow-hidden shadow-md">
              <Image
                src={city.img}
                alt={city.name}
                width={250}
                height={120}
                className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white text-base font-semibold">
                {city.name}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default StudyPlacesSection;
