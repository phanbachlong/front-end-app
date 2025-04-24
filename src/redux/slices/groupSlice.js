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
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const delGroup = createAsyncThunk('groups/delGroup', async (ids, { rejectWithValue }) => {
    try {
        await groupApi.delGroup(ids);
        return ids;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const editGroup = createAsyncThunk('group/editGroup', async ({ id, name, totalMember }, { rejectWithValue }) => {
    try {
        const res = groupApi.editGroup(id, { name, totalMember });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})


const groupSlice = createSlice({
    name: 'group',
    initialState: {
        groups: [],
        totalPages: 0,
        maxTotalMemberFromGroup: 0,
        message: null,
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
                const newGroup = action.meta.arg;
                newGroup.totalMember = 0;
                state.groups.push(newGroup);
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //del group
            .addCase(delGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(delGroup.fulfilled, (state, action) => {
                state.loading = false;
                const deleteIDs = action.meta.arg;
                state.groups = state.groups.filter(group => !deleteIDs.includes(group.id));
            })

            .addCase(delGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //update group
            .addCase(editGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editGroup.fulfilled, (state, action) => {
                state.loading = false;
                const updatedGroup = {
                    ...state.groups.find(g => g.id === action.meta.arg.id),
                    ...action.meta.arg,
                };
                state.groups = state.groups.map((group) =>
                    group.id === updatedGroup.id ? updatedGroup : group
                );
            })
            .addCase(editGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default groupSlice.reducer;

