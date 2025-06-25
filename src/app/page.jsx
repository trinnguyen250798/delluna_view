"use client";

import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        import('preline/preline.js');
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="relative">
                <button
                    id="dropdownButton"
                    data-dropdown-toggle="dropdownMenu"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                >
                    Dropdown
                    <svg
                        className="w-4 h-4 ml-2"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <div
                    id="dropdownMenu"
                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                >
                    <ul className="py-2 text-sm text-gray-700">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                Tuỳ chọn 1
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                Tuỳ chọn 2
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
