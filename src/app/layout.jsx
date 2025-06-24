// ✅ src/app/layout.jsx
import "./globals.css"; // luôn để ở đây (server-side)

import ClientLayout from "./layout.client";

export const metadata = {
    title: "Delluna Hotel Booking",
    description: "Đặt phòng khách sạn toàn cầu",
};

export default function RootLayout({ children }) {
    return (
        <html lang="vi">
        <body>
        <ClientLayout>{children}</ClientLayout>
        </body>
        </html>
    );
}
