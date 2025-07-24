'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getHotelDetail } from '@/services/hotelService'; // đường dẫn tới file chứa hàm

export default function HotelDetailPage() {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        if (id) {
            getHotelDetail(id).then(setHotel);
        }
    }, [id]);

    if (!hotel) return <div>Đang tải dữ liệu...</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">{hotel.name}</h1>
            <p>Địa chỉ: {hotel.address}</p>
            <p>Giá: {hotel.price} VND</p>
            <p>Mô tả: {hotel.description}</p>
        </div>
    );
}
