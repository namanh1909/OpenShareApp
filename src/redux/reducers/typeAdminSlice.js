import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

export const getType = createAsyncThunk('typeAdmin/getType', async (authToken) => {
  try {
    const response = await axios.get(`http://localhost/WEBSITE_OPENSHARE/controllers/admin/ItemType/displayItem.php`, {
      headers: {
          Authorization: `Bearer ${authToken}`,
      }
  })
  if(response.status == "200"){
    console.log(response.data)
    return response.data
  }
  } catch (error) {
    console.log(error)
  }
   
})

export const typeAdminSlice = createSlice({
  name: "typeAdmin",
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
    builder.addCase(getType.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(getType.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = action.payload;
        state.loading = "idle";
      }
    });

    builder.addCase(getType.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});

export default typeAdminSlice.reducer;
