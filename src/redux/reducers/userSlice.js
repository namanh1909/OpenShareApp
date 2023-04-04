import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiKey } from '../../contants/api'

export const getUsers = createAsyncThunk('users/getUsers', async (authToken) => {
    const response = await axios.get(`${apiKey}/getUsers.php`, {
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
    reducers: {},
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

    },
})

export default usersSlice.reducer