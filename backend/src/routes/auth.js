import express from "express";

import {
	registerUser,
	loginUser,
	refreshAccessToken,
} from "../services/auth.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
	try {
		const { name, email, password, bio } = req.body;
		const user = await registerUser(name, email, password, bio);
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

authRouter.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const { name, accessToken, refreshToken } = await loginUser(
			email,
			password,
		);

		// Set the refresh token as an HttpOnly cookie
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "Strict",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});

		// Send the access token with the user data in the response
		res.json({ name, accessToken });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

authRouter.post("/refresh-token", async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		return res.sendStatus(401);
	}

	try {
		const newAccessToken = await refreshAccessToken(refreshToken);
		res.json({ accessToken: newAccessToken });
	} catch (error) {
		res.status(403).json({ error: error.message });
	}
});

authRouter.post("/logout", (req, res) => {
	res.clearCookie("refreshToken");
	res.status(200).json({ message: "Logged out" });
});

export default authRouter;
