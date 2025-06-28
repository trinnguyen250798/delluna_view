'use client';
import { calculateRatingScore } from "@/lib/lib";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
export default function HotelCarousel({ hotels }) {

    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={4}
                navigation
                className="h-[300px]"
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {hotels.map((hotel) => (
                    <SwiperSlide key={hotel.id}>

                        <div className="bg-white rounded-xl shadow-md overflow-hidden relative transition hover:shadow-lg hover:-translate-y-1 duration-300">
                            <div className="relative overflow-hidden">
                                <img
                                    src={ hotel.thumbnail ||  "https://placehold.jp/400x160.png"  }
                                    alt={hotel.name}
                                    className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-200 transition">
                                    <HeartIcon className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                            <div className="p-3">
                                <div className="font-bold text-sm truncate">{hotel.name}</div>
                                <p className="text-xs text-gray-600">{hotel.city}, {hotel.country}</p>
                                <p className="text-sm text-gray-700 mt-1">1</p>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="text-sm text-gray-500">{hotel.rating} đánh giá</div>
                                    <div className="bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded flex">
                                        {calculateRatingScore(hotel.star_rating)}
                                    </div>
                                </div>
                                <div>{hotel.rooms_min_price_per_night}$</div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
