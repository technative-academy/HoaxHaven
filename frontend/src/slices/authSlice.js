import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../services/apiService";

export const login = createAsyncThunk(
	"auth/login",
	async ({ email, password }) => {
		const user = await api.login(email, password);
		return user;
	},
);

export const logout = createAsyncThunk("auth/logout", async () => {
	await api.logout();
});

const initialState = {
	isLoggedIn: api.isLoggedIn(),
	status: "idle",
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = "loading";
			})
			.addCase(login.fulfilled, (state) => {
				state.status = "succeeded";
				state.isLoggedIn = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoggedIn = false;
				state.status = "idle";
			});
	},
});

export default authSlice.reducer;

// const authSlice = createSlice({
// 	name: "auth",
// 	initialState: {},
// });

// export default authSlice.reducer;

// export const login = () => {};

// export const logout = () => {};
