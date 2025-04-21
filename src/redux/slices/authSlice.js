import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginApi from "../../api/LoginApi";

const tokenFromStorage = localStorage.getItem('token');

export const login = createAsyncThunk('auth/login', async (credentials, thunkApi) => {
    try {
        const res = await loginApi.login(credentials);
        console.log("Login response:", res); 
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response?.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: tokenFromStorage || null,
        loading: false,
        error: null
    },

    reducers:{
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log("Action payload:", action.payload);
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload;
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;




