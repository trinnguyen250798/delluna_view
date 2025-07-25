import axios from '@/lib/axios';
export const getHotels = async () => {
    try {
        const res = await axios.get('/api/hotels');
        return res.data; // hoặc res.data.data nếu Laravel trả vậy
    } catch (error) {
        console.error('Lỗi khi fetch hotel:', error);
        return [];
    }
};
export const getHotelDetail = async (id) => {
    try {
        const res = await axios.get(`/api/hotels/${id}`);
        return res.data;
    } catch (error) {
        console.error('Lỗi khi fetch hotel:', error);
        return [];
    }
};