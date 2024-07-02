import express from "express";
import z from "zod";

import pool from "../db.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
	try {
		const result = await pool.query("SELECT username FROM users");
		res.json(result.rows);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server error :(");
	}
});

userRouter.get("/:username", async (req, res, next) => {
	const { username } = req.params;

	try {
		const result = await pool.query(
			"SELECT username FROM users WHERE $1::text = users.username",
			[username],
		);
		const row = result.rows[0];
		if (!row) {
			res.status(404).send("Not found");
			return;
		}

		res.json(row);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server error :(");
	}
});

// userRouter.get("/:id", async (req, res, next) => {
// 	const { id } = req.params;

// 	try {
// 		const result = pool.query(
// 			"SELECT users.username, articles.title, articles.description, articles.date_published FROM users JOIN articles ON users.id = $1::number",
// 			[id],
// 		);
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).send("Server error :(");
// 	}
// });

{
	const schema = z.object({
		// Maximise misinformation by allowing the use of special character such as the Unicode left to right inverse
		username: z.string().min(2).max(16),
		email: z.string().email(),
		// Same here
		password: z.string(),
	});

	userRouter.post("/", async (req, res) => {
		const validated = schema.safeParse(req.body);
		if (!validated.success) {
			res.status(400).send();
			return;
		}

		// TODO: hash password
		const { username, email, password } = validated.data;
		try {
			await pool.query(
				'INSERT INTO users (username, email, "password", date_joined) VALUES ($1, $2, $3, CURRENT_DATE);',
				[username, email, password],
			);
			res.sendStatus(201);
		} catch (err) {
			console.log(err);
			res.status(500).send("Server error :(");
		}
	});
}

userRouter.delete("/:username", async (req, res, next) => {
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

export default userRouter;
