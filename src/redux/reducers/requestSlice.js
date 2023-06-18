import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

export const getrequest = createAsyncThunk('post/getrequest', async ({ authToken,dataUser}) => {
  try {
    const response = await axios.post(`${apiKeyUsers}/post/getRequest.php`,dataUser,{
      headers: {
          Authorization: `Bearer ${authToken}`,
      }
    })
    if(response.status == "200"){
      return response.data
    }

  } catch (error) {
    console.log("error",error)
  }
})

export const getrequest0 = createAsyncThunk('post/getrequest0', async ({ authToken, dataUser }) => {
  try {
    const response = await axios.post(`${apiKeyUsers}/post/getRequest.php`, dataUser, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    })
    if (response.status == "200") {
      let data = []
      if (response?.data?.data?.length > 0) {
        response?.data?.data?.forEach(element => {
          if (element?.status == 0) {
            data.push(element)
          }
        });
      }
      // console.log("data", data)
      return data
    }

  } catch (error) {
    console.log("error", error)
  }
})

export const getrequest1 = createAsyncThunk('post/getrequest1', async ({ authToken, dataUser }) => {
  try {
    const response = await axios.post(`${apiKeyUsers}/post/getRequest.php`, dataUser, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    })
    if (response.status == "200") {
      let data = []
      if (response?.data?.data?.length > 0) {
        response?.data?.data?.forEach(element => {
          if (element?.status == 1) {
            data.push(element)
          }
        });
      }
      // console.log("data", data)
      return data
    }

  } catch (error) {
    console.log("error", error)
  }
})

export const getrequest2 = createAsyncThunk('post/getrequest2', async ({ authToken, dataUser }) => {
  try {
    const response = await axios.post(`${apiKeyUsers}/post/getRequest.php`, dataUser, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    })
    if (response.status == "200") {
      let data = []
      if (response?.data?.data?.length > 0) {
        response?.data?.data?.forEach(element => {
          if (element?.status == 2) {
            data.push(element)
          }
        });
      }
      // console.log("data", data)
      return data
    }

  } catch (error) {
    console.log("error", error)
  }
})

export const getrequest3 = createAsyncThunk('post/getrequest3', async ({ authToken, dataUser }) => {
  try {
    const response = await axios.post(`${apiKeyUsers}/post/getRequest.php`, dataUser, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    })
    if (response.status == "200") {
      let data = []
      if (response?.data?.data?.length > 0) {
        response?.data?.data?.forEach(element => {
          if (element?.status == 3) {
            data.push(element)
          }
        });
      }
      // console.log("data", data)
      return data
    }

  } catch (error) {
    console.log("error", error)
  }
})

export const requestPost = createAsyncThunk('post/requestPost', async ({ authToken,dataUser}) => {
  try {
    const response = await axios.post(`${apiKeyUsers}/post/request.php`,dataUser, {
      headers: {
          Authorization: `Bearer ${authToken}`,
      }
    })
    if(response.status == "200"){
      if(response.data == `Bạn đã đạt đến giới hạn yêu cầu trong ngày.["message","ItemType is not Inserted"]`){
        return Alert.alert("Bạn đã đạt đến giới hạn yêu cầu trong ngày");
      }
      return Alert.alert("Yêu cầu thành công");
    }
xư
  } catch (error) {
    return Alert.alert("Bạn đã yêu cầu bài viết này rồi");
  }
})


export const rejectRequest = createAsyncThunk('post/rejectRequest', async ({ authToken,dataUser}) => {
  try {
    const response = await axios.put(`${apiKeyUsers}/post/refuseRequest.php`,dataUser, {
      headers: {
          Authorization: `Bearer ${authToken}`,
      }
    })
    if(response.status == "200"){
      return Alert.alert("Từ chối thành công");
    }

  } catch (error) {
    console.log("error",error)
    return Alert.alert("Đã xảy ra lỗi");
  }
})

export const acceptRequest = createAsyncThunk('post/acceptRequest', async ({ authToken,dataUser}) => {
  try {
    const response = await axios.put(`${apiKeyUsers}/post/acceptRequest.php`,dataUser, {
      headers: {
          Authorization: `Bearer ${authToken}`,
      }
    })
    if(response.status == "200"){
      return Alert.alert("Xác nhân cho thành công");
    }

  } catch (error) {
    console.log("error",error)
    return Alert.alert("Đã xảy ra lỗi");
  }
})



export const requestSlice = createSlice({
  name: "request",
  initialState: {
    data: [],
    loading: "idle",
    error: null,
    data0: [],
    data1: [],
    data2: [],
    data3: [],
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

    builder.addCase(getrequest0.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getrequest0.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = state.data;
        state.data1 = state.data1;
        state.data2 = state.data2;
        state.data3 = state.data3;
        state.data0 = action.payload;
        state.loading = "idle";
      }
    });

    builder.addCase(getrequest0.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });

    builder.addCase(getrequest1.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getrequest1.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data1 = action.payload;
        state.data2 = state.data2;
        state.data3 = state.data3;
        state.data0 = state.data0;
        state.loading = "idle";
      }
    });

    builder.addCase(getrequest1.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });

    builder.addCase(getrequest2.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getrequest2.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data1 = state.data1;
        state.data2 = action.payload;
        state.data3 = state.data3;
        state.data0 = state.data0;
        state.loading = "idle";
      }
    });

    builder.addCase(getrequest2.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });

    builder.addCase(getrequest3.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getrequest3.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data1 = state.data1;
        state.data2 = state.data2;
        state.data0 = state.data0;
        state.data3 = action.payload;
        state.loading = "idle";
      }
    });

    builder.addCase(getrequest3.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});

export default requestSlice.reducer;
