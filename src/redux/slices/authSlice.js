import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginApi from "../../api/LoginApi";

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const res = await loginApi.login(credentials)
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token:  null,
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
                state.loading = false;
                state.token = action.payload.token;
                state.user = {
                    userName: action.payload.userName,
                    email: action.payload.email,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    role: action.payload.role,
                    status: action.payload.status,
                };
                localStorage.setItem('token', action.payload.token)
                localStorage.setItem('userName', action.payload.userName)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;




