'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GoogleLoginButton from '@/components/login/GoogleLoginButton';

const BASE_URL = process.env.NEXT_PUBLIC_BARE_URL_API;

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        setIsLoggedIn(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/dellunahotel-logo.jpeg" alt="Delluna" width={50} height={50} />
                    <span className="text-2xl font-bold text-red-500">Delluna</span>
                </Link>

                <div className="space-x-3 flex items-center">
                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="font-medium rounded-lg text-sm inline-flex items-center"
                                type="button"
                            >
                                <span className="inline-flex justify-center items-center size-11 rounded-full border-4 border-gray-100 bg-gray-200 text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                                    </svg>
                                </span>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                    <ul className="py-2 text-sm text-gray-700">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                                Tuỳ chọn 1
                                            </a>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                                Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <GoogleLoginButton setIsLoggedIn={setIsLoggedIn} />
                    )}
                </div>
            </div>
        </header>
    );
}
