import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { apiKeyAdmin, apiKeyUsers } from '../../contants/api';
import { getStaff, getUsers } from './userSlice';

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${apiKeyUsers}/auth/login.php`, userData);
        console.log("res", response.data)
        thunkAPI.dispatch(getUsers(response.data.token))
        return response.data
    } catch (error) {
        console.log("error", error)
        throw new Error(error.response.data.message);
    }
});

export const loginAdmin = createAsyncThunk('auth/loginAdmin', async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${apiKeyAdmin}/login.php`, userData);
        console.log("res", response.data)
        thunkAPI.dispatch(getStaff(response.data.token))
        return response.data
    } catch (error) {
        console.log("error", error)
        throw new Error(error.response.data.message);
    }
});

const authSlice = createSlice({
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
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

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

export const { setToken, clearToken, logout } = authSlice.actions;

export default authSlice.reducer;
