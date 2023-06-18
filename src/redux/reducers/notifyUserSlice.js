import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";
import { convertImage } from "../../contants/helper";

export const getNotify = createAsyncThunk(
  "notify/getNotify",
  async ({ authToken, dataUser }) => {
    try {
      let listData = [];
      const response = await axios.post(
        `${apiKeyUsers}/post/getNoticeFromAdmin.php`,
        dataUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log(dataUser);
      if (response.status == "200") {
        response.data.data.forEach((element) => {
          // console.log(element.user_id);
          // console.log("idUser", dataUser.idUser);
          if (element?.user_id == dataUser.idUser) listData.push(element);
        });
      }

      const response2 = await axios.post(
        `${apiKeyUsers}/post/getNoticeGiveandReceive.php`,
        dataUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response2.status == "200") {
        response2.data.data.forEach((element) => {
          if (
            (element?.idUser == dataUser.idUser && element?.status_accept_reject == null)
            || (element?.idUserRequest_N == dataUser.idUser && element?.status_accept_reject == 0)
            || (element?.idUserRequest_N == dataUser.idUser && element?.status_accept_reject == 1)
            || (element?.idUser == dataUser.idUser && element?.status_accept_reject == 2)
            || (element?.idUser == dataUser.idUser && element?.status_accept_reject == 3)
            )
            listData.push(element);
        });
      }
      listData.sort((a, b) => {
        const dateA = new Date(a.createAt_N || a.created_at);
        const dateB = new Date(b.createAt_N || b.created_at);
        return dateB - dateA;
      });
      return listData;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const seenAcpPost = createAsyncThunk(
  "notify/seenAcpPost",
  async ({ authToken, dataUser }) => {
    try {
      const response = await axios.post(
        `${apiKeyUsers}/post/getPostWithidPost.php`,
        dataUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log("data user", response.data);
      if (response.status == "200") {
        if (response?.data?.data?.length > 0) {
          let a = response?.data?.data
          if (a[0]?.photos) {
            let output = convertImage(a[0])
            let newOut = output.map(letter => ({ image: letter }))

            return {
              data: a[0],
              output: newOut
            }
          }
          return a[0]
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const seenAcpPostRequest = createAsyncThunk(
  "notify/seenAcpPostRequest",
  async ({ authToken, dataUser }) => {
    try {
      const response = await axios.post(
        `${apiKeyUsers}/post/getManegerRequestByidPost.php`,
        dataUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log("user data", dataUser)
      // console.log("maneger request data", response.data);
      if (response.status == "200") {
        if (response?.data?.data?.length > 0) {
          let data = []
          response?.data?.data?.forEach(element => {
            if (element?.name == dataUser.name || element?.name == dataUser.userName) {
              data.push(element)
            }
          });
          if (data[0]?.photos) {
            let output = convertImage(data[0])
            let newOut = output.map(letter => ({ image: letter }))
            // console.log("a", data[0])
            return {
              data: data[0],
              output: newOut
            }
          }
          return data[0]
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const seenRequest = createAsyncThunk(
  "notify/seenAcpPost",
  async ({ authToken, dataUser }) => {
    try {
      const response = await axios.post(
        `${apiKeyUsers}/post/getPostRequestbyidPost.php`,
        dataUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log("seenRequest", response);
      if (response.status == "200") {
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const notifySlice = createSlice({
  name: "notify",
  initialState: {
    data: [],
    loading: "idle",
    error: null,
    detailPost: null,
    manegerRequest: null,
  },
  reducers: {
    logout: (state) => {
      state.data = [];
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotify.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getNotify.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = action.payload;
        state.loading = "idle";
        state.detailPost = state.detailPost
      }
    });

    builder.addCase(getNotify.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });

    builder.addCase(seenAcpPost.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.data = state.data;
      }
    });

    builder.addCase(seenAcpPost.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.data = state.data;
        state.detailPost = action.payload
      }
    });

    builder.addCase(seenAcpPost.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
        state.data = state.data;
      }
    });

    builder.addCase(seenAcpPostRequest.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.data = state.data;
      }
    });

    builder.addCase(seenAcpPostRequest.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.data = state.data;
        state.detailPost = state.detailPost;
        state.manegerRequest = action.payload;
      }
    });

    builder.addCase(seenAcpPostRequest.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
        state.data = state.data;
      }
    });
  },
});

export default notifySlice.reducer;
