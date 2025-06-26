'use client';

import { useEffect, useState } from 'react';

export default function ToastNotification({ message, type = 'error', onClose }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!show) return null;

    return (
        <div className="fixed top-5 right-5 z-[9999]">
            <div
                className={`flex items-center w-full max-w-xs p-4 text-sm text-gray-700 bg-white rounded-lg shadow border ${
                    type === 'error' ? 'border-red-500' : 'border-green-500'
                }`}
                role="alert"
            >
                {message}
            </div>
        </div>
    );
}
