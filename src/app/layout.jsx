'use client';

import './globals.css';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import 'flowbite';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastProvider } from '@/context/ToastContext';

export default function RootLayout({ children }) {
    useEffect(() => {
        // Load Preline
        import('preline/preline');

        // Load và khởi tạo Flowbite Datepicker
        import('flowbite-datepicker').then((module) => {
            const Datepicker = module.default;
            document.querySelectorAll('[datepicker]').forEach((el) => {
                new Datepicker(el);
            });
        });
    }, []);

    return (
        <html lang="vi">
        <body>
        <GoogleOAuthProvider clientId="499999895092-5dh6jn4o55fi0pa340muaf29l2e42jco.apps.googleusercontent.com">
            <ToastProvider>
                <Header />
                <main className="min-h-screen px-4 mx-auto max-w-[90rem]">{children}</main>
                <Footer />
            </ToastProvider>
        </GoogleOAuthProvider>
        </body>
        </html>
    );
}
