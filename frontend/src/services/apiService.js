const API_URL = import.meta.env.VITE_API_URL;

export async function makeApiRequest(url, options = {}) {
	options.headers = options.headers || {};
	// Include credentials for cross-origin requests
	options.credentials = "include";
	options.headers["Content-Type"] = "application/json";

	let accessToken = getAccessToken();
	if (accessToken) {
		options.headers["Authorization"] = `Bearer ${accessToken}`;
	}

	// TODO: show toast if this throws. Had circular import issue before
	let response = await fetch(`${API_URL}/${url}`, options);

	if (accessToken && (response.status === 401 || response.status === 403)) {
		// Attempt to refresh the access token and re-request
		try {
			accessToken = await refreshAccessToken();
			if (accessToken) {
				options.headers["Authorization"] = `Bearer ${accessToken}`;
				response = await fetch(`${API_URL}/${url}`, options);
			} else {
				throw new Error("Unauthorized");
			}
		} catch (error) {
			await logout();
			throw new Error("Unauthorized");
		}
	}

	if (response.status >= 400) {
		const data = await response.json();
		throw new Error(data.error || "Fetch failed");
	}

	return await response.json();
}

export function register(name, email, password, bio) {
	return makeApiRequest("auth/register", {
		method: "POST",
		body: JSON.stringify({ name, email, password, bio }),
	});
}

export async function login(email, password) {
	const response = await makeApiRequest("auth/login", {
		method: "POST",
		body: JSON.stringify({ email, password }),
	});

	if (response.accessToken) {
		sessionStorage.setItem("accessToken", response.accessToken);
	}

	return { id: response.id, name: response.name };
}

export async function logout() {
	await makeApiRequest("auth/logout", {
		method: "POST",
	});
	sessionStorage.removeItem("accessToken");
}

export function getAccessToken() {
	return sessionStorage.getItem("accessToken");
}

export async function refreshAccessToken() {
	const response = await makeApiRequest("auth/refresh-token", {
		method: "POST",
	});

	if (response.accessToken) {
		sessionStorage.setItem("accessToken", response.accessToken);
	}

	return response.accessToken;
}

export function isLoggedIn() {
	return !!sessionStorage.getItem("accessToken");
}
