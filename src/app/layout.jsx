import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
    title: "Delluna Hotel Booking",
    description: "Đặt phòng khách sạn toàn cầu",
};

export default function RootLayout({ children }) {
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
