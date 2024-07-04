import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { makeApiRequest } from "../services/apiService";

export const fetchThings = createAsyncThunk("things/fetchThings", async () => {
	const response = await makeApiRequest("articles", {
		method: "GET",
	});
	return response;
});

// Needs to be updated to our backend url
export const fetchThingsByUser = createAsyncThunk(
	"things/fetchThingsByUser",
	async (username) => {
		const response = await makeApiRequest(`users/${username}`, {
			method: "GET",
		});
		console.log(response);
		return response;
	},
);
// Needs to be updated to our backend url
export const fetchMyThings = createAsyncThunk(
	"things/fetchMyThings",
	async () => {
		const response = await makeApiRequest(`my-things`, {
			method: "GET",
		});
		return response;
	},
);

export const fetchThing = createAsyncThunk("things/fetchThing", async (id) => {
	return await makeApiRequest(`articles/${id}`, { method: "GET" });
});

export const addThing = createAsyncThunk(
	"things/addThing",
	async (newThing) => {
		const response = await makeApiRequest("articles", {
			method: "POST",
			body: JSON.stringify(newThing),
		});
		return response;
	},
);

export const editThing = createAsyncThunk(
	"things/editThing",
	async ({ id, updatedThing }) => {
		const response = await makeApiRequest(`articles/${id}`, {
			method: "PUT",
			body: JSON.stringify(updatedThing),
		});
		return response;
	},
);

export const deleteThing = createAsyncThunk(
	"things/deleteThing",
	async (id) => {
		await makeApiRequest(`articles/${id}`, { method: "DELETE" });
		return id;
	},
);

// // TODO: ADD tags
// export const addTag = createAsyncThunk(
// 	"things/addTag",
// 	async (id) => {
// 		await makeApiRequest(`with-tags/${id}`, { method: "POST" });
// 		return id;
// 	},
// );

// TODO: GET articles by TAGS
// TODO: take tag name rather than id
// "/with-tag/:id"
export const fetchAllArticlesByTags = createAsyncThunk(
	"things/allArticlesByTags",
	async (id) => {
		const response = await makeApiRequest(`with-tag/${id}`, {
			method: "GET",
		});
		return response;
	},
);

// TODO: GET tags for articles
// "/:articleId/tags"

export const fetchTagsForArticles = createAsyncThunk(
	"things/fetchTagsForArticles",
	async (articleId) => {
		const response = await makeApiRequest(`${articleId}/tags`, {
			METHOD: "GET",
		});
		return response;
	},
);

// TODO: GET all tags
// '/tags'
export const fetchAllTags = createAsyncThunk("things/allArticles", async () => {
	const response = await makeApiRequest(`tags`, { method: "GET" });
	return response;
});

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
				console.log(action.payload);
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
					(item) => item.id === action.payload.id,
				);
				state.items[index] = action.payload;
			})
			.addCase(deleteThing.fulfilled, (state, action) => {
				state.items = state.items.filter(
					(item) => item.id !== action.payload,
				);
			});
	},
});

export default thingsSlice.reducer;
