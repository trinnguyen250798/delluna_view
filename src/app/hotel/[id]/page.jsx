'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getHotelDetail } from '@/services/hotelService';
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import BoxSearch from "@/components/BoxSearch";
export default function HotelDetailPage()
{
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    useEffect(() => {
        let isMounted = true;
        if (id) {
            getHotelDetail(id).then((data) => {

                if (isMounted) {
                    setHotel(data.data);

                }
            });
        }
        return () => { isMounted = false; };
    }, [id]);

    if (!hotel) return <div>Đang tải dữ liệu...</div>;
    return (
        <div className=" mx-auto mt-[38px] p-4">
            <BoxSearch onSearch={(data) => console.log('Search data:', data)} />
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-[2]">
                        <img
                            src={hotel.thumbnail || "https://placehold.jp/400x160.png"}
                            alt={hotel.name}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div className="flex-[3]">
                        <h1 className="text-2xl font-bold mb-2">{hotel.name}</h1>
                        <p className="text-gray-600 mb-4">{hotel.description}</p>
                        <p className="text-gray-800 font-semibold mb-2">
                            {hotel.city}, {hotel.country}
                        </p>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-yellow-500">★</span>
                            <span>{hotel.rating} ({hotel.review_count} đánh giá)</span>
                        </div>
                        <p className="text-lg font-bold text-orange-500">
                            Từ {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(hotel.rooms_min_price_per_night)} / đêm
                        </p>
                    </div>
                </div>
            </div>
            {Array.isArray(hotel?.rooms) && hotel.rooms.map((room) => (
                <div key={room.id} className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold">
                        {room.room_type?.name || `Phòng ${room.room_number}`}
                    </h2>
                    <p className="text-gray-600">{room.description}</p>
                    <p className="text-orange-500 font-bold mt-2">
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(room.price_per_night)} / đêm
                    </p>
                </div>
            ))}


        </div>

    );
}
