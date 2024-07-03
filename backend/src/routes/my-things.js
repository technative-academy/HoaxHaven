import express from "express";
import pool from "../db.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query("SELECT * FROM things WHERE user_id = $1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "INSERT INTO things (name, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [name, description, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "UPDATE things SET name = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [name, description, id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Thing not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "DELETE FROM things WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Thing not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
