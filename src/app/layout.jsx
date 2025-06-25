"use client";

import { useEffect } from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "flowbite";
export default function RootLayout({ children }) {
    useEffect(() => {
        import("preline/preline.js");
    }, []);

    return (
        <html lang="vi">
        <body>
        <Header />
        <main className="min-h-screen px-4 max-w-7xl mx-auto">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
