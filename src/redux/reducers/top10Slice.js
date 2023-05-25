import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiKeyAdmin, apiKeyUsers } from '../../contants/api'
import { Alert } from 'react-native'

export const getTop10 = createAsyncThunk('top10/getTop10', async () => {
  try {
    const response = await axios.get(`${apiKeyUsers}/post/displayTop10.php`)
     console.log("response post", response)
  if(response.status == "200"){
    return response.data
  }

  } catch (error) {
    console.log(error)
  }

})


export const top10Slice = createSlice({
    name: 'top10',
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
        builder.addCase(getTop10.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        })

        builder.addCase(getTop10.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload
                state.loading = 'idle'
            }
        })

        builder.addCase(getTop10.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.error = 'Error occured'
            }
        })

    },
})

export default top10Slice.reducer