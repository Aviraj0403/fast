'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

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
  { name: 'Bhopal', img: '/image/bhopal-city.jpg' },
  { name: 'Chandigarh', img: '/image/chandigarh.jpeg' },
  { name: 'Patna', img: '/image/patna.jpeg' },
];

const StudyPlacesSection = () => {
  return (
    <section className="w-full bg-[#0b0f19] py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(24,24,27,0)_0%,rgba(11,15,25,1)_100%)] z-10 pointer-events-none"></div>
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-900 to-transparent"></div>

      <div className="relative z-20 container mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 mb-4 md:mb-6 tracking-tight">
            Top Educational Hubs
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            Discover premier institutions across India's most vibrant student cities.
          </p>
        </div>

        <div className="-mx-4 md:mx-0">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay, EffectCoverflow]}
            className="mySwiper w-full py-10"
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 40 },
            }}
          >
            {indianCities.map((city, idx) => (
              <SwiperSlide key={idx} className="max-w-[300px] w-[80%] md:w-auto">
                <div className="group relative h-[400px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:border-blue-500/50">
                  <Image
                    src={city.img}
                    alt={city.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-100"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                  <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 text-blue-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-widest uppercase">Education Hub</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                      {city.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default StudyPlacesSection;
