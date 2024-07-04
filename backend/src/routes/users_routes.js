import express from "express";
import z from "zod";

import pool from "../db.js";
import authenticateToken from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/", authenticateToken, async (req, res, next) => {
	try {
		const result = await pool.query("SELECT username FROM users");
		res.json(result.rows);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server error :(");
	}
});

// GET: detailed view of user with username, bio, date joined and articles they've written. Fetched using username
userRouter.get("/:username", async (req, res, next) => {
	const { username } = req.params;

	try {
		const user = await pool.query(
			"SELECT users.username, users.bio, users.date_joined FROM users WHERE $1 = users.username",
			[username],
		);
		const articles = await pool.query(
			"SELECT  articles.id, articles.title FROM articles JOIN users ON articles.user_id=users.id WHERE users.id=(SELECT id FROM users WHERE username=$1)",
			[username],
		);
		let articlesList = [];
		const userInfoToBeSent = user.rows[0];
		const articlesByThisUser = articles.rows.map((element) => {
			articlesList.push(element);
		});

		if (!userInfoToBeSent) {
			res.status(404).send("Not found");
			return;
		}
		res.json({
			...userInfoToBeSent,
			articles: articlesList,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send("Server error :(");
	}
});

{
	const schema = z.object({
		// Maximise misinformation by allowing the use of special character such as the Unicode left to right inverse
		username: z.string().min(2).max(16),
		email: z.string().email(),
		// Same here
		password: z.string(),
	});

	userRouter.post("/", authenticateToken, async (req, res) => {
		const validated = schema.safeParse(req.body);
		if (!validated.success) {
			res.status(400).send();
			return;
		}

		// TODO: hash password
		const { username, email, password } = validated.data;
		try {
			await pool.query(
				'INSERT INTO users (username, email, "password", date_joined, bio) VALUES ($1, $2, $3, CURRENT_DATE, $4);',
				[username, email, password],
			);
			res.sendStatus(201);
		} catch (err) {
			console.log(err);
			res.status(500).send("Server error :(");
		}
	});
}

userRouter.delete("/:username", authenticateToken, async (req, res, next) => {
	const { username } = req.params;

	try {
		const result = await pool.query(
			"DELETE FROM users WHERE $1 = users.username",
			[username],
		);

		if (!result) {
			res.status(404).send("User not found");
			return;
		}

		res.sendStatus(204);
	} catch (err) {
		if (err.constraint === "articles_user_id_fkey") {
			res.status(409).send(
				"Unable to delete user because they have content",
			);
			return;
		}
		console.log(err);
		res.status(500).send("Server error :(");
	}
});

// userRouter.put("/:id/bio", authenticateToken, async (req, res) => {
// 	const userId = req.params.id;
// 	const { bio } = req.body;

// 	// Optional: validate the bio input
// 	if (typeof bio !== "string" || bio.trim() === "") {
// 		res.status(400).send("Invalid bio provided.");
// 		return;
// 	}

// 	try {
// 		const result = await pool.query(
// 			"UPDATE users SET bio = $1 WHERE id = $2",
// 			[bio, userId],
// 		);

// 		if (result.rowCount === 0) {
// 			res.status(404).send("User not found.");
// 		} else {
// 			res.sendStatus(204);
// 		}
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).send("Server error: Unable to update bio.");
// 	}
// });

export default userRouter;
