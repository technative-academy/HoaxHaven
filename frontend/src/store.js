import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import breadcrumbReducer from "./slices/breadcrumbSlice";
import thingsReducer from "./slices/thingsSlice";
import toastReducer from "./slices/toastSlice";
import usersReducer from "./slices/usersSlice";

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
