import axios from '@/lib/axios';

export const getCitys = async (keyword = '', limit = 10, offset = 0) => {
    try {
        const res = await axios.get('/api/citys', {
            params: {
                search: keyword,
                limit,
                offset
            },
        });
        return res.data;
    } catch (error) {
        console.error('Lỗi khi fetch city:', error);
        return [];
    }
};

export const getHotelDetail = async (id) => {
    try {
        const res = await axios.get(`/api/citys/${id}`);
        return res.data;
    } catch (error) {
        console.error('Lỗi khi fetch hotel:', error);
        return [];
    }
};