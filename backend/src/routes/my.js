import express from "express";

import pool from "../db.js";
import authenticateToken from "../middleware/auth.js";

const myRouter = express.Router();

// GET info about me /v1/my/
// This route returns JSON which contains all articles based on req.session.user. I.e. logged in users articles by their user ID.
// TODO: most of this logic is shared with /v1/users/:id, split into a function that this endpoint calls
myRouter.get("/", authenticateToken, async (req, res, next) => {
	const username = req.user.username;

	try {
		const userDbResult = await pool.query(
			"SELECT users.username, users.bio, users.date_joined FROM users WHERE $1 = users.username",
			[username],
		);
		const articlesDbResult = await pool.query(
			"SELECT  articles.id, articles.title FROM articles JOIN users ON articles.user_id=users.id WHERE users.id=(SELECT id FROM users WHERE username=$1)",
			[username],
		);
		let articlesList = [];
		const userInfoToBeSent = userDbResult.rows[0];
		const articlesByThisUser = articlesDbResult.rows.map((element) => {
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

/*
myArticleRouter.post("/", authenticateToken, async (req, res) => {
	const { name, description } = req.body;
	const userId = req.user.id;
	try {
		const result = await pool.query(
			"INSERT INTO things (name, description, user_id) VALUES ($1, $2, $3) RETURNING *",
			[name, description, userId],
		);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

myArticleRouter.put("/:id", authenticateToken, async (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;
	const userId = req.user.id;
	try {
		const result = await pool.query(
			"UPDATE things SET name = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
			[name, description, id, userId],
		);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Thing not found" });
		}
		res.json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

myArticleRouter.delete("/:id", authenticateToken, async (req, res) => {
	const { id } = req.params;
	const userId = req.;
	try {
		const result = await pool.query(
			"DELETE FROM things WHERE id = $1 AND user_id = $2 RETURNING *",
			[id, userId],
		);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Thing not found" });
		}
		res.sendStatus(204);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});
*/




export default myRouter;
