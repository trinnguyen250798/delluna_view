// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import hotelReducer from './features/hotel/hotelSlice';
import cityReducer from './features/city/citySlice';

export const store = configureStore({
    reducer: {
        hotel: hotelReducer,
        city: cityReducer,

    },
});
