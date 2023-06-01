import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

export const getManegerRequest = createAsyncThunk(
  "manegerRequest/getManegerRequest",
  async ({ authToken,idUser }) => {
    try {
      const response = await axios.post(
        `${apiKeyUsers}/post/manegerRequest.php`,
        {
          idUser
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.status === 200) {
        if(response.data.data.length > 0){
          const uniqueData = response.data.data.filter((item, index, arr) => {
            return arr.findIndex((t) => t.idPost === item.idPost) === index;
          });
          return uniqueData
        }
        return response.data
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const getManegerRequestAll = createAsyncThunk(
  "manegerRequest/getManegerRequestAll",
  async ({ authToken,idUser }) => {
    try {
      const response = await axios.post(
        `${apiKeyUsers}/post/manegerRequest.php`,
        {
          idUser
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.status === 200) {
        if(response.data.data.length > 0){
          return response.data
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const manegerRequestSlice = createSlice({
  name: "manegerRequest",
  initialState: {
    data: [],
    loading: "idle",
    error: null,
    listRequest: []
  },
  reducers: {
    logout: (state) => {
      state.data = [];
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getManegerRequest.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getManegerRequest.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.data = action.payload
        state.listRequest = state.listRequest
      }
    });

    builder.addCase(getManegerRequest.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });

    builder.addCase(getManegerRequestAll.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getManegerRequestAll.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.listRequest = action.payload
        state.data = state.data
      }
    });

    builder.addCase(getManegerRequestAll.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });

  },
});

export default manegerRequestSlice.reducer;
