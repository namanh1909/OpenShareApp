import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

export const approvePost = createAsyncThunk(
  "avpprove/approvePost",
  async ({ authToken, idPost,idStaff,idUser, title }) => {
    try {
      const response = await axios.post(
        `${apiKeyAdmin}/PostManager/approvPost.php`,
        {
          idPost,idStaff,idUser, title
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const unApprovePost = createAsyncThunk(
  "avpprove/unApprovePost",
  async ({ authToken, idPost,idStaff,idUser, title, messagefromAdmin }) => {
    try {
      const response = await axios.post(
        `${apiKeyAdmin}/PostManager/rejectPost.php`,
        {
          idPost,idStaff,idUser, title, messagefromAdmin
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const avpproveSlice = createSlice({
  name: "avpprove",
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
    builder.addCase(approvePost.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(approvePost.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
    });

    builder.addCase(approvePost.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });

    builder.addCase(unApprovePost.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(unApprovePost.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
    });

    builder.addCase(unApprovePost.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });


  },
});

export default avpproveSlice.reducer;
