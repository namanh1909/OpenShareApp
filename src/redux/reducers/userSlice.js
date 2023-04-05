import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiKeyAdmin, apiKeyUsers } from '../../contants/api'

export const getUsers = createAsyncThunk('users/getUsers', async (authToken) => {

    const response = await axios.get(`${apiKeyUsers}/profile/getUsers.php`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
    console.log(response.data)
    return response.data.user
})

export const getStaff = createAsyncThunk('users/getStaff', async (authToken) => {
    const response = await axios.get(`${apiKeyAdmin}/getStaff.php`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
    console.log(response.data)
    return response.data.user
})

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        loading: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.data = [];
            state.loading = 'idle'
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        })

        builder.addCase(getUsers.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload
                state.loading = 'idle'
            }
        })

        builder.addCase(getUsers.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.error = 'Error occured'
            }
        })

        builder.addCase(getStaff.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        })

        builder.addCase(getStaff.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload
                state.loading = 'idle'
            }
        })

        builder.addCase(getStaff.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.error = 'Error occured'
            }
        })

    },
})

export default usersSlice.reducer