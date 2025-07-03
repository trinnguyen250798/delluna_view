import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHotels } from '@/services/hotelService';

export const fetchHomeData = createAsyncThunk('home/fetchHomeData', async () => {
    const res = await getHotels();
    return res;
});

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        hotels: [],
        cities: [],
        loading: true,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchHomeData.fulfilled, (state, action) => {
                state.hotels = action.payload.data || [];
                state.cities = action.payload.city || [];
                state.loading = false;
            })
            .addCase(fetchHomeData.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default homeSlice.reducer;
