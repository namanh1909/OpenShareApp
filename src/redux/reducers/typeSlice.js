import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

export const getType = createAsyncThunk('post/getType', async (authToken) => {
  try {
    const response = await axios.get(`http://localhost/WEBSITE_OPENSHARE/controllers/users/type/getType.php`, {
      headers: {
          Authorization: `Bearer ${authToken}`,
      }
  })
  if(response.status == "200"){
    return response.data
  }

  } catch (error) {
    console.log(error)
  }
   
})

export const typeSlice = createSlice({
  name: "type",
  initialState: {
    data: [],
    loading: "idle",
    error: null,
    listTypeItem: []
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
        state.listTypeItem = state.data ? state.data.data.map((province) => ({
          label: province.nameType,
          value: province.nameType,
      })) : []
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

export default typeSlice.reducer;
