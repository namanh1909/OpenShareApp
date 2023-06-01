import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiKeyAdmin, apiKeyUsers } from '../../contants/api'
import { Alert } from 'react-native'

export const getPostApprove = createAsyncThunk('postApprove/getPostApprove', async (authToken) => {
    try {
        const response = await axios.get(`${apiKeyAdmin}/PostManager/displayapprovPost.php`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        })
        console.log("res un app", response)

        if (response.status == "200") {
            return response.data
        }

    } catch (error) {
        console.log(error)
    }
})

export const postApproveSlice = createSlice({
    name: 'postApprove',
    initialState: {
        loading: 'idle',
        error: null,
        data: [],
    },
    reducers: {
        logout: (state) => {
            state.data = [];
            state.loading = 'idle'
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPostApprove.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        })

        builder.addCase(getPostApprove.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload
                state.loading = 'idle'
            }
        })

        builder.addCase(getPostApprove.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.error = 'Error occured'
            }
        })
    },
})

export default postApproveSlice.reducer