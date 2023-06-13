import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { apiKeyAdmin, apiKeyUsers } from "../../contants/api";

export const getDetailRequestNotifyPost = createAsyncThunk(
    "detailNotify/getDetailRequestNotifyPost",
    async ({ authToken, idPost }) => {
        try {
            const response = await axios.post(
                `${apiKeyUsers}/post/getPostWithIdPost.php`,
                {
                    idPost
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            );
            console.log("data detail", response)
            if (response.status === 200) {
                return response.data.data
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
);


export const detailNotifySlice = createSlice({
    name: "detailNotify",
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
        builder.addCase(getDetailRequestNotifyPost.pending, (state, action) => {
            if (state.loading === "idle") {
                state.loading = "pending";
            }
        });

        builder.addCase(getDetailRequestNotifyPost.fulfilled, (state, action) => {
            if (state.loading === "pending") {
                state.loading = "idle";
                state.data = action.payload
            }
        });

        builder.addCase(getDetailRequestNotifyPost.rejected, (state, action) => {
            if (state.loading === "pending") {
                state.loading = "idle";
                state.error = "Error occured";
            }
        });
    },
});

export default detailNotifySlice.reducer;
