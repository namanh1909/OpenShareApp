import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiKeyAdmin, apiKeyUsers } from '../../contants/api'
import { Alert } from 'react-native'

export const getPost = createAsyncThunk('post/getPost', async () => {
  try {
    const response = await axios.get(`${apiKeyUsers}/post/get.php`)
  console.log("response post", response)
  if(response.status == "200"){
    return response.data
  }

  } catch (error) {
    console.log(error)
  }

})

export const createPost = createAsyncThunk('post/createPost', async ({ authToken,dataPost}) => {
    try {
      const response = await axios.post(`${apiKeyUsers}/post/create.php`,dataPost, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
      return Alert.alert("Thêm bài viết thành công", [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

    } catch (error) {
      console.log("error",error)
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


        builder.addCase(createPost.pending, (state, action) => {
          if (state.loading === 'idle') {
              state.loading = 'pending'
          }
      })

      builder.addCase(createPost.fulfilled, (state, action) => {
          if (state.loading === 'pending') {
              state.loading = 'idle'
          }
      })

      builder.addCase(createPost.rejected, (state, action) => {
          if (state.loading === 'pending') {
              state.loading = 'idle'
              state.error = 'Error occured'
          }
      })
    },
})

export default postSlice.reducer