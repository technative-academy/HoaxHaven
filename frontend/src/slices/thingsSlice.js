import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../services/apiService";

export const fetchThings = createAsyncThunk("things/fetchThings", async () => {
  const response = await apiService("things", { method: "GET" });
  return response;
});

export const fetchThingsByUser = createAsyncThunk(
  "things/fetchThingsByUser",
  async (userId) => {
    const response = await apiService(`users/${userId}/things`, {
      method: "GET",
    });
    return response;
  }
);

export const fetchMyThings = createAsyncThunk(
  "things/fetchMyThings",
  async () => {
    const response = await apiService(`my-things`, {
      method: "GET",
    });
    return response;
  }
);

export const fetchThing = createAsyncThunk("things/fetchThing", async (id) => {
  return await apiService(`things/${id}`, { method: "GET" });
});

export const addThing = createAsyncThunk(
  "things/addThing",
  async (newThing) => {
    const response = await apiService("my-things", {
      method: "POST",
      body: JSON.stringify(newThing),
    });
    return response;
  }
);

export const editThing = createAsyncThunk(
  "things/editThing",
  async ({ id, updatedThing }) => {
    const response = await apiService(`my-things/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedThing),
    });
    return response;
  }
);

export const deleteThing = createAsyncThunk(
  "things/deleteThing",
  async (id) => {
    await apiService(`my-things/${id}`, { method: "DELETE" });
    return id;
  }
);

const thingsSlice = createSlice({
  name: "things",
  initialState: {
    items: [],
    userThings: [],
    currentThing: null,
    status: "idle",
    userThingsStatus: "idle",
    currentThingStatus: "idle",
    error: null,
    userThingsError: null,
    currentThingError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchThings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchThings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchThingsByUser.pending, (state) => {
        state.userThingsStatus = "loading";
      })
      .addCase(fetchThingsByUser.fulfilled, (state, action) => {
        state.userThingsStatus = "succeeded";
        state.userThings = action.payload;
      })
      .addCase(fetchThingsByUser.rejected, (state, action) => {
        state.userThingsStatus = "failed";
        state.userThingsError = action.error.message;
      })
      .addCase(fetchMyThings.pending, (state) => {
        state.userThingsStatus = "loading";
      })
      .addCase(fetchMyThings.fulfilled, (state, action) => {
        state.userThingsStatus = "succeeded";
        state.userThings = action.payload;
      })
      .addCase(fetchMyThings.rejected, (state, action) => {
        state.userThingsStatus = "failed";
        state.userThingsError = action.error.message;
      })
      .addCase(fetchThing.pending, (state) => {
        state.currentThingStatus = "loading";
      })
      .addCase(fetchThing.fulfilled, (state, action) => {
        state.currentThingStatus = "succeeded";
        state.currentThing = action.payload;
      })
      .addCase(fetchThing.rejected, (state, action) => {
        state.currentThingStatus = "failed";
        state.currentThingError = action.error.message;
      })
      .addCase(addThing.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editThing.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteThing.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default thingsSlice.reducer;
