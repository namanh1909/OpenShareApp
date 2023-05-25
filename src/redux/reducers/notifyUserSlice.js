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
        `http://localhost/WEBSITE_OPENSHARE/controllers/users/post/getNoticeFromAdmin.php`,
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
            console.log(element.user_id)
            console.log("idUser", dataUser.idUser)
          if (element?.user_id
            == dataUser.idUser) listData.push(element);
        });
      }

      const response2 = await axios.post(
        `http://localhost/WEBSITE_OPENSHARE/controllers/users/post/getNoticeGiveandReceive.php`,
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
            element?.idUser == dataUser.idUser ||
            element?.idUserRequest_N == dataUser.idUser
          )
            listData.push(element);
        });
      }
      listData.sort((a, b) => new Date(b.createAt_N) - new Date(a.createAt_N));
      return listData;
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
  },
});

export default notifySlice.reducer;
