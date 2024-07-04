import express from "express";

import pool from "../db.js";
import authenticateToken from "../middleware/auth.js";

const myArticleRouter = express.Router();

// GET MY ARTICLES /v1/my-things/
// This route returns JSON which contains all articles based on req.session.user. I.e. logged in users articles by their user ID.
myArticleRouter.get("/", authenticateToken, async (req, res) => {
	const userId = req.user.id;
	try {
		const result = await pool.query(
			"SELECT id, title, date_published FROM articles WHERE user_id = $1",
			[userId],
		);
		res.json(result.rows);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

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
	const userId = req.user.id;
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

export default myArticleRouter;
