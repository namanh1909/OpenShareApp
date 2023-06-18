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
        // console.log(response.data);
        return response.data.data;
      }
    } catch (error) {
      // console.log(error);
      throw error;
    }
  },
);

export const createAddress = createAsyncThunk(
  "users/createAddress",
  async ({ authToken, idUser, address }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${apiKeyUsers}/address/create.php`,
        {
          idUser,
          address
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.status === 200) {
        thunkAPI.dispatch(getAddress({ authToken, idUser }));
      }
    } catch (error) {
      // console.log(error);
      throw error;
    }
  },
);


export const deleteAddress = createAsyncThunk(
  "users/deleteAddress",
  async ({ authToken, idAdress, idUser }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${apiKeyUsers}/address/delete.php`,
        {
          idAdress
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.status === 200) {
        // console.log(response.data);
        thunkAPI.dispatch(getAddress({ authToken, idUser }));
      }
    } catch (error) {
      // console.log(error);
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
    listItemAddress: []
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
        state.listItemAddress = state.data ? state.data.map((province) => ({
                label: province.address,
                value: province.address,
            })) : []
      }
    });

    builder.addCase(getAddress.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });

    builder.addCase(createAddress.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.data = state.data;

      }
    });

    builder.addCase(createAddress.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.data = state.data;

      }
    });

    builder.addCase(createAddress.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
        state.data = state.data;
      }
    });

    builder.addCase(deleteAddress.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.data = state.data;

      }
    });

    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.data = state.data;
      }
    });

    builder.addCase(deleteAddress.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
        state.data = state.data;
      }
    });
  },
});

export default addressSlice.reducer;
