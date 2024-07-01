import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    message: null,
  },
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload;
    },
    hideToast: (state) => {
      state.message = null;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
