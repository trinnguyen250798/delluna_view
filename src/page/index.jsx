import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
    return (
        <>
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-4 text-blue-800">Tìm khách sạn phù hợp với bạn</h1>
                <p className="text-gray-600 mb-8">Khám phá và đặt phòng khách sạn tại hơn 180 quốc gia.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                            <img src="/hotel.jpg" alt="Hotel" className="rounded w-full h-40 object-cover mb-3" />
                            <h3 className="text-lg font-semibold">Khách sạn {i}</h3>
                            <p className="text-sm text-gray-600">Vị trí trung tâm, tiện nghi đầy đủ</p>
                            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Đặt ngay</button>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}
/layout