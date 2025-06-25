"use client";

import Link from "next/link";
import Image from "next/image";
export default function Header() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-red-500">
                    <Image
                        src="/dellunahotel-logo.jpeg"
                        alt="Delluna"
                        width={50}
                        height={50}
                    />
                </Link>
                <div className="space-x-3 flex">
                    <div className="relative">
                        <button
                            id="dropdownButton"
                            data-dropdown-toggle="dropdownMenu"
                            className=" dark:border-blue-500 dark:text-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center inline-flex items-center"
                            type="button">   <span
                            className="inline-flex justify-center items-center size-11 rounded-full border-4 border-gray-100 bg-gray-200 text-gray-800 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                          stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                    </svg>
                    </span>
                        </button>
                        <div id="dropdownMenu"
                             className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
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
                    <Link href="http://127.0.0.1:8000/api/auth/google/redirect" className="text-gray-700 hover:text-red-500 font-medium">Login</Link>
                </div>
            </div>
        </header>
    );
}
