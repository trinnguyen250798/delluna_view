// src/redux/features/hotel/hotelSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHotels } from '@/services/hotelService'; // hoặc hotelAPI.js

export const fetchHotels = createAsyncThunk('hotel/fetchHotels', async () => {
    const res = await getHotels();
    return res.data;
});

const hotelSlice = createSlice({
    name: 'hotel',
    initialState: {
        hotels: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.loading = false;
                state.hotels = action.payload;
            })
            .addCase(fetchHotels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default hotelSlice.reducer;
