import { createSlice } from "@reduxjs/toolkit";

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState: [],
  reducers: {
    setBreadcrumb: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBreadcrumb } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
