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
        if (response.status == "200") {
            let data = {}
            let data0 = []
            let data1 = []
            let data2 = []
            console.log("data profile", response.data.data)
            if (response?.data?.data?.length > 0) {
                response?.data?.data?.forEach(element => {
                    if (element?.soluongdocho > 0 && element?.isShow == 0) {
                        data0.push(element)
                    }
                    if (element?.soluongdocho > 0 && element?.isShow == 1) {
                        data1.push(element)
                    }
                    if (element?.soluongdocho > 0 && element?.isShow == 2) {
                        data2.push(element)
                    }
                });
            }
            data.data0 = data0
            data.data1 = data1
            data.data2 = data2
            return data
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