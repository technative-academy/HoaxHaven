import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import thingsReducer from "./slices/thingsSlice";
import usersReducer from "./slices/usersSlice";
import toastReducer from "./slices/toastSlice";
import breadcrumbReducer from "./slices/breadcrumbSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    things: thingsReducer,
    users: usersReducer,
    toast: toastReducer,
    breadcrumb: breadcrumbReducer,
  },
});

export default store;
