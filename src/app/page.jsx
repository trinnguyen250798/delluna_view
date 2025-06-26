"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    import("preline/preline.js");
  }, []);

  return (
      <div className=" ">
        <div id="animation-carousel" className="relative w-full  mx-auto h-96" data-carousel="static">
            {/* Carousel wrapper */}
            <div className="relative h-full overflow-hidden rounded-lg">
                {/* Item 1 */}
                <div className="hidden duration-200 ease-linear" data-carousel-item>
                    <img
                        src="carousel-4.svg"
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                    />
                </div>
                {/* Item 2 */}
                <div className="hidden duration-200 ease-linear" data-carousel-item>
                    <img
                        src="carousel-4.svg"
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                    />
                </div>
                {/* Item 3 */}
                <div className="hidden duration-200 ease-linear" data-carousel-item="active">
                    <img
                        src="carousel-4.svg"
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                    />
                </div>
                {/* Item 4 */}
                <div className="hidden duration-200 ease-linear" data-carousel-item>
                    <img
                        src="carousel-4.svg"
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                    />
                </div>
                {/* Item 5 */}
                <div className="hidden duration-200 ease-linear" data-carousel-item>
                    <img
                        src="carousel-4.svg"
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                    />
                </div>
            </div>

            {/* Slider controls */}
            <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
            >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
            >
              <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
            </button>
            <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
            >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
            >
              <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
            </button>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-2lg p-4 flex items-center space-x-4 w-full max-w-2xl mx-auto mt-4">
            <div className="flex-1">
                <label htmlFor="destination" className="sr-only">Where do you want to go?</label>
                <input
                    type="text"
                    id="destination"
                    placeholder="Where do you want to go?"
                    className="w-full p-2 border-none focus:outline-none"
                />
            </div>
            <div className="flex space-x-4">
                <div>
                    <label htmlFor="check-in" className="sr-only">Check In</label>
                    <input
                        type="date"
                        id="check-in"
                        value="2025-06-27"
                        className="p-2 border-none focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="check-out" className="sr-only">Check Out</label>
                    <input
                        type="date"
                        id="check-out"
                        value="2025-06-30"
                        className="p-2 border-none focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="guests" className="sr-only">Guests</label>
                    <input
                        type="number"
                        id="guests"
                        value="2"
                        min="1"
                        className="w-16 p-2 border-none focus:outline-none"
                    />
                </div>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                Let's go! →
            </button>
        </div>
    </div>
  );
}