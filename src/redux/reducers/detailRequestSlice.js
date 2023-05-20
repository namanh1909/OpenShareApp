import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";


export const confirmOk = createAsyncThunk(
  "detailSlice/confirmOk",
  async ({ authToken,idRequest }) => {
    try {
      const response = await axios.put(
        `http://localhost/WEBSITE_OPENSHARE/controllers/users/post/suscessDetail.php`,
        {
          idRequest
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.status === 200) {
        console.log(response)
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);


export const confirmCancel = createAsyncThunk(
  "detailSlice/confirmCancel",
  async ({ authToken,idRequest }) => {
    try {
      const response = await axios.put(
        `http://localhost/WEBSITE_OPENSHARE/controllers/users/post/failDetail.php`,
          {idRequest}
        ,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.status === 200) {
        console.log(response)

      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const detailSlice = createSlice({
  name: "detailSlice",
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

    builder.addCase(confirmOk.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(confirmOk.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
    });

    builder.addCase(confirmOk.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });

    builder.addCase(confirmCancel.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(confirmCancel.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
    });

    builder.addCase(confirmCancel.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });


  },
});

export default detailSlice.reducer;
