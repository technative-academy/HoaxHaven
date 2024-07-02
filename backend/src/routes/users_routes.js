import express from "express";

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

export default userRouter;
