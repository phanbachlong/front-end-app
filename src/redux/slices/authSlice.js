import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RegisterService from '../../features/Register/RegisterService';



export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const res = await RegisterService.createUser(userData);

        console.log("res.status:", res.status);
        console.log("res.data:", res.data);

        if (res.status >= 200 && res.status < 300) {
            return {
                message: res.data || "User registered successfully",
            };
        } else {
            return rejectWithValue("Unexpected response from server.");
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Registration fail!!!");
    }
}
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        message: null,
        loading: false,
        error: null
    },
    reducers: {
        clearAuth: (state) => {
            state.user = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;   