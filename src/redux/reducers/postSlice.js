import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiKeyAdmin, apiKeyUsers } from '../../contants/api'

export const getPost = createAsyncThunk('users/getPost', async (authToken) => {
  try {
    const response = await axios.get(`${apiKeyUsers}/post/get.php`, {
      headers: {
          Authorization: `Bearer ${authToken}`,
      }
  })
  if(response.status == "200"){
    return response.data
  }

  } catch (error) {
    console.log(error)
  }
   
})

export const postSlice = createSlice({
    name: 'post',
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
        builder.addCase(getPost.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        })

        builder.addCase(getPost.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload
                state.loading = 'idle'
            }
        })

        builder.addCase(getPost.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.error = 'Error occured'
            }
        })
    },
})

export default postSlice.reducer