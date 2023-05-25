import { createSlice, createAsyncThunk, compose } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";
import { getStaff, getUsers } from "./userSlice";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${apiKeyUsers}/auth/login.php`,
        userData,
      );
      console.log("res", response)
      if(response.data.message == "Bạn đã đăng nhập thành công."){
        if ((response.status = "200")) {
          console.log("token return", response.data.token)
          setTimeout(() => {
            thunkAPI.dispatch(getUsers(response.data.token));
          }, 500);
          return response.data;
        }
      }
      else {
        return Alert.alert(response.data.message, '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }

 
    } catch (error) {
      console.log("error", error);
      throw new Error(error.response.data.message);
    }
  },
);

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${apiKeyAdmin}/login.php`, userData);
      // console.log("res", response.data)
      if(response.data.message == "Bạn đã đăng nhập thành công."){
        if ((response.status = "200")) {
          thunkAPI.dispatch(getStaff(response.data.token));
          return response.data;
        }
      }
      else {
        return Alert.alert(response.data.message, '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    } catch (error) {
      console.log("error", error);
      throw new Error(error.response.data.message);
    }
  },
);

export const changePasswordUser = createAsyncThunk('users/changePasswordUser', async ({ authToken, dataUser }) => {
  try {
    const response = await axios.put(`${apiKeyUsers}/auth/changepassword.php`,
      dataUser
      , {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    console.log("res", response)

    return Alert.alert(response.data.message, '', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);


  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (userData) => {
    try {
      const response = await axios.post(
        `${apiKeyUsers}/auth/register.php`,
        userData,
      );
      console.log("res", response)
      // eslint-disable-next-line no-constant-condition
      if ((response.status = "200")) {
        return Alert.alert(response.data.message, '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    
      }
    } catch (error) {
      console.log("error", error);
      throw new Error(error.response.data.message);
    }
  },
);



const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(loginAdmin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
    });
    builder.addCase(loginAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(changePasswordUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(changePasswordUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(changePasswordUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setToken, clearToken, logout } = authSlice.actions;

export default authSlice.reducer;
