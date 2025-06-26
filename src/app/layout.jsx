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
        import('preline/preline.js');
    }, []);

    return (
        <html lang="vi">
        <body>
        <GoogleOAuthProvider clientId="499999895092-5dh6jn4o55fi0pa340muaf29l2e42jco.apps.googleusercontent.com">
            <ToastProvider>
                <Header />
                <main className="min-h-screen px-4 max-w-7xl mx-auto">{children}</main>
                <Footer />
            </ToastProvider>
        </GoogleOAuthProvider>
        </body>
        </html>
    );
}
