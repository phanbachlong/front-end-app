import { configureStore } from "@reduxjs/toolkit";
import registerReducer from './slices/registerSlice';
import authReducer from './slices/authSlice';
import groupReducer from './slices/groupSlice'

export const store = configureStore({
    reducer: {
        register: registerReducer,
        auth: authReducer,
        group: groupReducer
    }
});
