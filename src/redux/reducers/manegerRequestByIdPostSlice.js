import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

export const getDetailRequestManeger = createAsyncThunk(
  "manegerRequest/getDetailRequestManeger",
  async ({ authToken,idUser }) => {
    try {
      const response = await axios.post(
        `http://localhost/WEBSITE_OPENSHARE/controllers/users/post/manegerRequest.php`,
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

export const getManegerRequestByIdPostSlice = createSlice({
  name: "getManegerRequestByIdPost",
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
    builder.addCase(getDetailRequestManeger.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getDetailRequestManeger.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.data = action.payload
      }
    });

    builder.addCase(getDetailRequestManeger.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });



    
  },
});

export default getManegerRequestByIdPostSlice.reducer;
