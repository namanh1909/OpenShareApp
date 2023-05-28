import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiKeyAdmin, apiKeyUsers } from '../../contants/api'
import { Alert } from 'react-native'

export const getPostProfile = createAsyncThunk('postUserAdmin/getPostProfile', async ({ authToken, dataUser }) => {
    try {
        const response = await axios.post(
          `http://localhost/WEBSITE_OPENSHARE/controllers/admin/PostManager/getPostByIdUser.php`,
          dataUser,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("post user", response)
        if (response.status == "200") {
            return response.data
        }

    } catch (error) {
        console.log(error)
    }
})

export const banUser = createAsyncThunk('postUserAdmin/banUser', async ({ authToken, dataUser }) => {
    try {
        const response = await axios.post(`http://localhost/WEBSITE_OPENSHARE/controllers/admin/UserManager/banUser.php`, dataUser, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        })
        console.log("banUser", response)
        if (response.status == "200") {
            return Alert.alert("Khoá tài khoản thành công")
        }

    } catch (error) {
        console.log(error)
    }
})

export const UnbanUser = createAsyncThunk('postUserAdmin/UnbanUser', async ({ authToken, dataUser }) => {
    try {
        const response = await axios.post(`http://localhost/WEBSITE_OPENSHARE/controllers/admin/UserManager/unbanUser.php`, dataUser, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        })
        console.log("banUser", response)
        if (response.status == "200") {
            // return response.data
        }

    } catch (error) {
        console.log(error)
    }
})

export const postUserAdminSlice = createSlice({
    name: 'postUserAdmin',
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

        builder.addCase(banUser.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        })

        builder.addCase(banUser.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
            }
        })

        builder.addCase(banUser.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.error = 'Error occured'
            }
        })

        builder.addCase(UnbanUser.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        })

        builder.addCase(UnbanUser.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
            }
        })

        builder.addCase(UnbanUser.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.error = 'Error occured'
            }
        })
    },
})

export default postUserAdminSlice.reducer