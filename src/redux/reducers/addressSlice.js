import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

export const getAddress = createAsyncThunk(
  "users/getAddress",
  async ({ authToken, idUser }) => {
    try {
      const response = await axios.post(
        `${apiKeyUsers}/address/get.php`,
        {
          idUser,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.status === 200) {
        console.log(response.data);
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const addressSlice = createSlice({
  name: "address",
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
    builder.addCase(getAddress.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getAddress.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = action.payload;
        state.loading = "idle";
      }
    });

    builder.addCase(getAddress.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});

export default addressSlice.reducer;
