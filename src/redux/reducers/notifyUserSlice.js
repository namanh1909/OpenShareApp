import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

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
      console.log("request", response);
      console.log(dataUser);
      if (response.status == "200") {
        response.data.data.forEach((element) => {
          console.log(element.user_id);
          console.log("idUser", dataUser.idUser);
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
      console.log("request", response2);

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
      console.log("data user", dataUser);
      if (response.status == "200") {
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const seenAcpPostRequest = createAsyncThunk(
  "notify/seenAcpPost",
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
      console.log("data user", dataUser);
      if (response.status == "200") {
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
      console.log("data user", dataUser);
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
      }
    });

    builder.addCase(seenAcpPost.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
    });

    builder.addCase(seenAcpPost.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});

export default notifySlice.reducer;
