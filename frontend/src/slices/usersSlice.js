import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../services/apiService";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await apiService("users", { method: "GET" });
  return response;
});

export const fetchUser = createAsyncThunk("users/fetchUser", async (id) => {
  const response = await apiService(`users/${id}`, { method: "GET" });
  return response;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    user: null,
    status: "idle",
    userStatus: "idle",
    error: null,
    userError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userStatus = "failed";
        state.userError = action.error.message;
      });
  },
});

export default usersSlice.reducer;
