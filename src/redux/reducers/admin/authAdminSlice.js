import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { apiKeyAdmin, apiKeyUsers } from '../../../contants/api';


const authStaff = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAdmin.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(loginAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
        });
        builder.addCase(loginAdmin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export const { setToken, clearToken, logout } = authStaff.actions;

export default authStaff.reducer;
