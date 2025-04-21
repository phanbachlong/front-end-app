import { configureStore } from "@reduxjs/toolkit";
import registerReducer from './slices/registerSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        register: registerReducer,
        auth: authReducer
    }
});
