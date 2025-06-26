"use client";

import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        import('preline/preline.js');
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">

        </div>
    );
}
