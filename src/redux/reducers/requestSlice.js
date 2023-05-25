import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

export const getrequest = createAsyncThunk('post/getrequest', async ({ authToken,dataUser}) => {
  try {
    const response = await axios.post(`http://localhost/WEBSITE_OPENSHARE/controllers/users/post/getRequest.php`,dataUser,{
      headers: {
          Authorization: `Bearer ${authToken}`,
      }
  })
    console.log("request",response)
    if(response.status == "200"){
      return response.data
    }

  } catch (error) {
    console.log("error",error)
  }
})

export const requestPost = createAsyncThunk('post/requestPost', async ({ authToken,dataUser}) => {
  try {
    const response = await axios.post(`${apiKeyUsers}/post/request.php`,dataUser, {
      headers: {
          Authorization: `Bearer ${authToken}`,
      }
  })
    console.log(response)
    if(response.status == "200"){
      return Alert.alert("Yêu cầu thành công");
    }

  } catch (error) {
    console.log("error",error)
    return Alert.alert("Bạn đã yêu cầu bài viết này rồi");
  }
})


export const rejectRequest = createAsyncThunk('post/rejectRequest', async ({ authToken,dataUser}) => {
  try {
    const response = await axios.put(`http://localhost/WEBSITE_OPENSHARE/controllers/users/post/refuseRequest.php`,dataUser, {
      headers: {
          Authorization: `Bearer ${authToken}`,
      }
  })
    console.log("response", response)
    if(response.status == "200"){
      return Alert.alert("Từ chối thành công");
    }

  } catch (error) {
    console.log("error",error)
    return Alert.alert("Từ chối thất bại");
  }
})

export const acceptRequest = createAsyncThunk('post/acceptRequest', async ({ authToken,dataUser}) => {
  try {
    const response = await axios.put(`http://localhost/WEBSITE_OPENSHARE/controllers/users/post/acceptRequest.php`,dataUser, {
      headers: {
          Authorization: `Bearer ${authToken}`,
      }
  })
    console.log("response", response)
    if(response.status == "200"){
      return Alert.alert("Xác nhân cho thành công");
    }

  } catch (error) {
    console.log("error",error)
    return Alert.alert("Từ chối thất bại");
  }
})



export const requestSlice = createSlice({
  name: "request",
  initialState: {
    data: [],
    loading: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.data = [];
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getrequest.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getrequest.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = action.payload;
        state.loading = "idle";
      }
    });

    builder.addCase(getrequest.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});

export default requestSlice.reducer;
