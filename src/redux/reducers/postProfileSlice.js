import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiKeyAdmin, apiKeyUsers } from '../../contants/api'
import { Alert } from 'react-native'

export const getPostProfile = createAsyncThunk('postProfile/getPostProfile', async ({ authToken, dataUser }) => {
    try {
        const response = await axios.post(`${apiKeyUsers}/post/displayPostbyidUser.php`, dataUser, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        })
        console.log(response)
        if (response.status == "200") {
            return response.data
        }

    } catch (error) {
        console.log(error)
    }
})

export const postProfile = createSlice({
    name: 'postProfile',
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
        builder.addCase(getPostProfile.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        })

        builder.addCase(getPostProfile.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload
                state.loading = 'idle'
            }
        })

        builder.addCase(getPostProfile.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.error = 'Error occured'
            }
        })
    },
})

export default postProfile.reducer