import express from "express";

import pool from "../db.js";
import authenticateToken from "../middleware/auth.js";

const articleRouter = express.Router();

// Get all articles
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

// Get articles by article ID
articleRouter.get("/:id", async (req, res, next) => {
	const { id } = req.params;

	try {
		const result = await pool.query(
			'SELECT articles.title, articles.description, articles.date_published AS datePublished, users.username, array_agg(tags.tag_name) AS "tags" FROM articles JOIN article_tags ON article_tags.article_id=articles.id JOIN tags ON tags.id=article_tags.tag_id JOIN users ON articles.user_id=users.id WHERE articles.id = $1 GROUP BY articles.title, articles.description, articles.date_published, users.username',
			[id],
		);

		if (result.rows.length > 0) {
			res.json(result.rows[0]);
		} else {
			res.status(404).send("Article not found");
		}
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

//Post new Article + Tag
articleRouter.post("/", authenticateToken, async (req, res, next) => {
	const { title, description, tagName } = req.body;

	try {
		// the RETURNING returns the Id for the console.log below
		const result = await pool.query(
			"INSERT INTO articles (title, description, date_published, user_id) VALUES ($1, $2, CURRENT_DATE, $3) RETURNING id, title, description, date_published, user_id;",
			[title, description, req.user.id],
		);

		const resultId = result.rows[0].id;

		const tagCheck = await pool.query(
			"SELECT id FROM tags WHERE tag_name=$1 LIMIT 1;",
			[tagName],
		);

		let tagId;

		if (tagCheck.rows.length === 0) {
			const tagInsertResult = await pool.query(
				"INSERT INTO tags (tag_name) VALUES ($1) RETURNING id;",
				[tagName],
			);
			tagId = tagInsertResult.rows[0].id;
		} else {
			tagId = tagCheck.rows[0].id;
		}

		await pool.query(
			"INSERT INTO article_tags (article_id, tag_id) VALUES ($1, $2);",
			[resultId, tagId],
		);

		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

//Delete an Article by article ID.
articleRouter.delete("/:id", authenticateToken, async (req, res) => {
	try {
		const tagDeletion = await pool.query(
			"Delete FROM article_tags WHERE article_id=$1;",
			[req.params.id],
		);
		const toBeDeleted = await pool.query(
			"DELETE FROM articles WHERE id=$1;",
			[req.params.id],
		);
		res.status(204).send("Article deleted");
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal server error");
	}
});

//Put update on an article+tag
// TODO: take tag name rather than id
articleRouter.put("/:id", authenticateToken, async (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;

	try {
		const updateArticle =
			"UPDATE articles SET title=$1, description=$2 WHERE id = $3";
		await pool.query(updateArticle, [
			title,
			description,
			id,
		]);

		// TODO: update tags

		res.status(201).send("User has been updated :)");
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

//Get articles by Tags
// TODO: take tag name rather than id
articleRouter.get("/with-tag/:id", async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT articles.id as articleId, articles.title as title, articles.user_id as authorId, users.username as authorUsername FROM articles JOIN article_tags ON articles.id=article_tags.article_id JOIN users ON users.id = articles.user_id WHERE article_tags.tag_id = $1;",
			[req.params.id],
		);
		res.json(result.rows);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error");
	}
});

//Get tags for articles
// TODO: merge with GET /:articleId
articleRouter.get("/:articleId/tags", async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT tags.tag_name, articles.title FROM tags JOIN article_tags ON tags.id=article_tags.tag_id JOIN articles ON articles.id=article_tags.article_id WHERE article_tags.article_id=$1;",
			[req.params.articleId],
		);
		res.json(result.rows);
	} catch (err) {
		console.log(err);
		res.status(500).send("An Internal Server Error Occurred");
	}
});

//Get all tags
articleRouter.get("/tags", async (req, res) => {
	try {
		const result = await pool.query("SELECT tag_name FROM tags;");
		res.json(result.rows);
	} catch (err) {
		console.log(err);
		res.status(500).send("An Internal Server Error Occurred");
	}
});

export default articleRouter;
