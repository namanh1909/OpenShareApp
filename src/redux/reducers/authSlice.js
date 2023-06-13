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
        userData
      );
      // console.log("res", response);
      if (response.data.message == "Bạn đã đăng nhập thành công.") {
        if ((response.status = "200")) {
          // console.log("token return", response.data.token);
          thunkAPI.dispatch(resetSendOTP());
          setTimeout(() => {
            thunkAPI.dispatch(getUsers(response.data.token));

          }, 500);
          return response.data;
        }
      } else {
        thunkAPI.dispatch(resetSendOTP());
        return Alert.alert(response.data.message);
      }
    } catch (error) {
      // console.log("error", error);
      throw new Error(error.response.data.message);
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${apiKeyAdmin}/Staff/login.php`, userData);
      // console.log("res", response.data)
      if (response.data.message == "Bạn đã đăng nhập thành công.") {
        if ((response.status = "200")) {
          thunkAPI.dispatch(getStaff(response.data.token));
          return response.data;
        }
      } else {
        return Alert.alert(response.data.message)
      }
    } catch (error) {
      // console.log("error", error);
      throw new Error(error.response.data.message);
    }
  }
);

export const changePasswordUser = createAsyncThunk(
  "users/changePasswordUser",
  async ({ authToken, dataUser }) => {
    try {
      const response = await axios.put(
        `${apiKeyUsers}/auth/changepassword.php`,
        dataUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log("res", response);

      return Alert.alert(response.data.message)
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const changePasswordAdmin = createAsyncThunk(
  "users/changePasswordUser",
  async ({ authToken, dataUser }) => {
    try {
      const response = await axios.put(
        `${apiKeyAdmin}/Staff/changpassword.php`,
        dataUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log("res", response);

      return Alert.alert(response.data.message)
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    const response = await axios.post(
      `${apiKeyUsers}/auth/register.php`,
      userData
    );
    // console.log("res", response);
    // eslint-disable-next-line no-constant-condition
    if ((response.status = "200")) {
      return Alert.alert(response.data.message)
    }
  } catch (error) {
    console.log("error", error);
    throw new Error(error.response.data.message);
  }
});

export const checkSendOTP = createAsyncThunk("auth/checkSendOTP", async () => {
  return true;
});
export const resetSendOTP = createAsyncThunk("auth/resetSendOTP", async () => {
  return false;
});

export const forgotPasswordUser = createAsyncThunk(
  "auth/forgotPasswordUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${apiKeyUsers}/auth/sendOtp.php`,
        userData
      );
      // console.log("res", response);
      // eslint-disable-next-line no-constant-condition
      if (response.data.message == "Reset mật khẩu thành công!") {
        thunkAPI.dispatch(checkSendOTP());
        return Alert.alert(response.data.message)
      } else {
        return Alert.alert(response.data.message)
      }
    } catch (error) {
      console.log("error", error);
      throw new Error(error.response.data.message);
    }
  }
);

export const sendOTPUser = createAsyncThunk(
  "auth/sendOTPUser",
  async (userData) => {
    try {
      const response = await axios.post(
        `${apiKeyUsers}/auth/resetpassword.php`,
        userData
      );

      if (response.status == "200") {
        // console.log(response.data);
        if ((response.data.message = "Reset mật khẩu thành công!")) {
          return Alert.alert(
            `Mật khẩu mới là: ${response.data.newPassword}`)
        }
        return Alert.alert(response.data.message)
      }
    } catch (error) {
      console.log("error", error);
      throw new Error(error.response.data.message);
    }
  }
);

export const forgotPasswordAdmin = createAsyncThunk(
  "auth/forgotPasswordAdmin",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${apiKeyAdmin}/Staff/sendOtp.php`,
        userData
      );
      // console.log("res", response);
      // eslint-disable-next-line no-constant-condition
      if (response.data.message == "Reset mật khẩu thành công!") {
        thunkAPI.dispatch(checkSendOTP());
        return Alert.alert(response.data.message)
      } else {
        return Alert.alert(response.data.message)
      }
    } catch (error) {
      console.log("error", error);
      throw new Error(error.response.data.message);
    }
  }
);

export const sendOTPAdmin = createAsyncThunk(
  "auth/sendOTPAdmin",
  async (userData) => {
    try {
      const response = await axios.post(
        `${apiKeyAdmin}/Staff/resetpassword.php`,
        userData
      );

      if (response.status == "200") {
        // console.log(response.data);
        if ((response.data.message = "Reset mật khẩu thành công!")) {
          return Alert.alert(`Mật khẩu mới là: ${response.data.newPassword}`);
        }
        return Alert.alert(response.data.message)
      }
    } catch (error) {
      console.log("error", error);
      throw new Error(error.response.data.message);
    }
  }
);

export const stopLoading = createAsyncThunk(
  "auth/stopLoading",
  async () => {
    return false
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLoading: false,
    error: null,
    isSendOTP: false,
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

    builder.addCase(forgotPasswordUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(forgotPasswordUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(forgotPasswordUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(checkSendOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(checkSendOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSendOTP = action.payload;
    });
    builder.addCase(checkSendOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(resetSendOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(resetSendOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSendOTP = action.payload;
    });
    builder.addCase(resetSendOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(sendOTPUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sendOTPUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(sendOTPUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(sendOTPAdmin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sendOTPAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(sendOTPAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setToken, clearToken, logout } = authSlice.actions;

export default authSlice.reducer;
