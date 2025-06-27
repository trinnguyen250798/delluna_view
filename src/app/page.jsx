"use client";

import { useState, useEffect, useRef } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import { Carousel } from "flowbite"; // Import Carousel from Flowbite

export default function Page() {
    const [state, setState] = useState([
        {
            startDate: null,
            endDate: null,
            key: "selection",
        },
    ]);

    // Calculate number of nights
    const nightsCount = state[0].endDate && state[0].startDate
        ? Math.round((state[0].endDate.getTime() - state[0].startDate.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    // Handle clear action
    const handleClear = () => {
        setState([{ startDate: null, endDate: null, key: "selection" }]);
    };

    // Ref for carousel and datepicker initialization
    const carouselRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined" && carouselRef.current) {
            new Carousel(carouselRef.current, {
                defaultPosition: 0,
                interval: 3000, // Auto slide every 3 seconds
            });
        }
    }, []);

    return (
        <div className=" mx-auto p-4">
            {/* Carousel */}
            <div ref={carouselRef}
                id="animation-carousel"
                className="relative  w-full mx-auto h-96"
                data-carousel="static" >
                <div className="relative h-full overflow-hidden rounded-lg">
                    <div className="hidden duration-200 ease-linear" data-carousel-item>
                        <img
                            src="/carousel-4.svg"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="Slide 1"
                        />
                    </div>
                    <div className="hidden duration-200 ease-linear" data-carousel-item>
                        <img
                            src="/carousel-4.svg"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="Slide 2"
                        />
                    </div>
                    <div
                        className="hidden duration-200 ease-linear"
                        data-carousel-item="active"
                    >
                        <img
                            src="/carousel-4.svg"
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="Slide 3"
                        />
                    </div>
                </div>
                <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg
                        className="w-4 h-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            d="M5 1 1 5l4 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg> </span>
                </button>
                <button
                    type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next
                >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg
                className="w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
            >
              <path
                  d="m1 9 4-4-4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
            </svg>
          </span>
                </button>
            </div>

            {/* Search Box */}
            <div className="bg-white relative z-50 rounded-lg border border-gray-200 shadow-2xl p-5 flex items-center space-x-4  max-w-4xl mx-auto mt-[-30px]">
                <div className="flex-1 border-r border-gray-400 pr-[10px] ">
                    <input
                        type="text"
                        id="destination"
                        placeholder="Where do you want to go?"
                        className="bg-gray-50 border  border-transparent hover:border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                 <div className="flex-[2] border-r border-gray-400 pr-[10px] ">
                    a
                </div>
                <div className="flex-[2] border-r border-gray-400 pr-[10px] ">
                    n
                </div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                    Let's go! →
                </button>
            </div>
        </div>
    );
}