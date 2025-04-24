import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import groupApi from "../../api/Group";


export const getAllGroups = createAsyncThunk('groups/groupList', async ({ page, size, minTotalMember, maxTotalMember, search }, { rejectWithValue }) => {
    try {
        const params = { page, size, minTotalMember, maxTotalMember, search };
        const res = await groupApi.getAllGroups({ params });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

export const createGroup = createAsyncThunk('groups/createGroup', async (value, { rejectWithValue }) => {
    try {
        const res = await groupApi.createGroups(value);
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


const groupSlice = createSlice({
    name: 'group',
    initialState: {
        groups: [],
        totalPages: 0,
        maxTotalMemberFromGroup: 0,
        loading: false,
        error: null
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllGroups.fulfilled, (state, action) => {
                state.loading = false;
                state.groups = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.maxTotalMemberFromGroup = Math.max(...action.payload.content.map(group => group.totalMember));

            })
            .addCase(getAllGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //create group
            .addCase(createGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.loading = false;
                const newGroup = action.payload;
                newGroup.totalMember = 0;
                state.groups.push(newGroup);
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default groupSlice.reducer;

