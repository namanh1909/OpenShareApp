import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

export const getType = createAsyncThunk(
  "typeAdmin/getType",
  async (authToken) => {
    try {
      const response = await axios.get(
        `http://localhost/WEBSITE_OPENSHARE/controllers/admin/ItemType/displayItem.php`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status == "200") {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const createType = createAsyncThunk(
  "typeAdmin/createType",
  async ({ authToken, nameType }) => {
    try {
      const response = await axios.post(
        `http://localhost/WEBSITE_OPENSHARE/controllers/admin/ItemType/addItem.php`,
        {
          nameType,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updateType = createAsyncThunk(
  "typeAdmin/updateType",
  async ({ authToken, nameType, idType }) => {
    try {
      const response = await axios.post(
        `http://localhost/WEBSITE_OPENSHARE/controllers/admin/ItemType/updateItem.php`,
        {
          nameType,
          idType,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteType = createAsyncThunk(
  "typeAdmin/deleteType",
  async ({ authToken, idType }) => {
    try {
      const response = await axios.post(
        `http://localhost/WEBSITE_OPENSHARE/controllers/admin/ItemType/deleteItem.php`,
        {
          idType,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

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

    builder.addCase(createType.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(createType.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
    });

    builder.addCase(createType.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });

    builder.addCase(updateType.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(updateType.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
    });

    builder.addCase(updateType.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });

    builder.addCase(deleteType.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });

    builder.addCase(deleteType.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
    });

    builder.addCase(deleteType.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});

export default typeAdminSlice.reducer;
