import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

export const getNumberGive = createAsyncThunk(
  "give/getNumberGive",
  async ({ authToken, dataUser }) => {
    try {
      let listData = [];
      const response = await axios.post(
        `http://localhost/WEBSITE_OPENSHARE/controllers/users/post/displaynumberItemGiveSuccess.php`,
        dataUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status == "200") {
        return response.data.data;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const giveSlice = createSlice({
  name: "give",
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
    builder.addCase(getNumberGive.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getNumberGive.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = action.payload;
        state.loading = "idle";
      }
    });

    builder.addCase(getNumberGive.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});

export default giveSlice.reducer;
