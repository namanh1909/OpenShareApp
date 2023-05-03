import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

export const getManegerUser = createAsyncThunk('getManegerUser/getUser', async (token) => {
  try {
    const response = await axios.get(`http://localhost/WEBSITE_OPENSHARE/controllers/admin/UserManager/displayUser.php`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    console.log("data user", response)
    if (response.status == "200") {
      console.log(response.data)
      return response.data
    }
  } catch (error) {
    console.log(error)
  }

})

export const ManegerUserSlice = createSlice({
  name: "manegerUser",
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
    builder.addCase(getManegerUser.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getManegerUser.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = action.payload;
        state.loading = "idle";
      }
    });

    builder.addCase(getManegerUser.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});

export default ManegerUserSlice.reducer;
