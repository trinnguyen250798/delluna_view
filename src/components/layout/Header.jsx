'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GoogleLoginButton from '@/components/login/GoogleLoginButton';

const BASE_URL = process.env.NEXT_PUBLIC_BARE_URL_API;

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        setIsLoggedIn(false);
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
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-500 hover:text-red-700"
                        >
                            Đăng xuất
                        </button>
                    ) : (
                        <GoogleLoginButton setIsLoggedIn={setIsLoggedIn} />
                    )}
                </div>
            </div>
        </header>
    );
}