import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Alert } from 'react-native'
import { apiKeyAdmin, apiKeyUsers } from '../../contants/api'

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (authToken) => {
    const response = await axios.get(`${apiKeyUsers}/profile/getUsers.php`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if ((response.status = "200")) {
      return response.data.user;
    }
  }
);

export const getStaff = createAsyncThunk(
  "users/getStaff",
  async (authToken) => {
    const response = await axios.get(`${apiKeyAdmin}/Staff/getStaff.php`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if ((response.status = "200")) {
      return response.data.user;
    }
  }
);

export const editProfile = createAsyncThunk(
  "users/editProfile",
  async ({ authToken, dataUser }) => {
    try {
      const response = await axios.put(
        `${apiKeyUsers}/profile/editProfile.php`,
        dataUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("res", response);

      if (response.status == 200) {
        return Alert.alert("Cập nhật thành công");
      } else {
        return Alert.alert("Cập nhật thất bại");
      }
    } catch (error) {}
  }
);

export const editProfileAdmin = createAsyncThunk(
  "users/editProfileAdmin",
  async ({ authToken, dataUser }) => {
    try {
      const response = await axios.put(
        `${apiKeyAdmin}/Staff/editprofile.php`,
        dataUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("res", response);

      if (response.status === 200) {
        return Alert.alert("Cập nhật thành công", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } else {
        return Alert.alert("Cập nhật thất bại", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);


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

        builder.addCase(editProfile.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        })

        builder.addCase(editProfile.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
            }
        })

        builder.addCase(editProfile.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.error = 'Error occured'
            }
        })

    },
})

export default usersSlice.reducer