import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";


export const getManegerRequestAll = createAsyncThunk(
  "listRequestAll/getManegerRequestAll",
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
        if (response?.data?.data?.length > 0) {
          let list1 = []
          let list2 = []
          let list3 = []

          response?.data?.data?.forEach(element => {
            if (element?.status == 1) {
              list1.push(element)
            }
            if (element?.status == 3) {
              list2.push(element)
            }
            if (element?.status == 4) {
              list3.push(element)
            }
          });

          let data = {

          }

          data.data1 = list1
          data.data2 = list2
          data.data3 = list3
          return data
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const listRequestAllSlice = createSlice({
  name: "listRequestAll",
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

export default listRequestAllSlice.reducer;
