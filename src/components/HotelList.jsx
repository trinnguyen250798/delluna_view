export default function HotelList({ hotels }) {
    return (
        <ul className="space-y-2">
            {hotels.map((hotel) => (
                <li key={hotel.id} className="p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-lg font-semibold">{hotel.name}</h2>
                    <p>Địa chỉ: {hotel.address}</p>
                </li>
            ))}
        </ul>
    );
}