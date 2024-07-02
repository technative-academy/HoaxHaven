import express from "express";

import pool from "../db.js";

const articleRouter = express.Router();

articleRouter.get("/", async (req, res, next) => {
	try {
		const results = await pool.query(
			"SELECT articles.id, articles.title, articles.description, articles.date_published, users.username FROM articles JOIN users ON articles.user_id = users.id",
		);
		res.json(results.rows);
	} catch (err) {
		console.log(err);
		res.status(500).send("Articles have not been sent, try again later...");
	}
});

export default articleRouter;
