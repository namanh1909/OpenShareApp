import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiKeyAdmin, apiKeyUsers } from '../../contants/api'
import { Alert } from 'react-native'

export const getPostUnApprove = createAsyncThunk('postUnApprove/getPostApprove', async (authToken) => {
  try {
    const response = await axios.get(`http://localhost/WEBSITE_OPENSHARE/controllers/admin/PostManager/displayUnapprovedPost.php`, {
      headers: {
          Authorization: `Bearer ${authToken}`,
      }
  })
  console.log("res un app", response)

  if(response.status == "200"){
    return response.data
  }

  } catch (error) {
    console.log(error)
  }
})

export const postUnApproveSlice = createSlice({
    name: 'postUnApprove',
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
        builder.addCase(getPostUnApprove.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        })

        builder.addCase(getPostUnApprove.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload
                state.loading = 'idle'
            }
        })

      builder.addCase(getPostUnApprove.rejected, (state, action) => {
          if (state.loading === 'pending') {
              state.loading = 'idle'
              state.error = 'Error occured'
          }
      })
    },
})

export default postUnApproveSlice.reducer