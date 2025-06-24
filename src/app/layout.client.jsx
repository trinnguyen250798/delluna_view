"use client";

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({ children }) {
    useEffect(() => {
        import("preline/preline.js");
    }, []);

    return (
        <>
            <Header />
            <main className="min-h-screen px-4 max-w-7xl mx-auto">{children}</main>
            <Footer />
        </>
    );
}
