import { configDotenv } from "dotenv";
import express from "express";

configDotenv({
	path: [".env.local", ".env"],
});

const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
	res.send("hello");
});

app.listen(port, () => console.log(`app listening on port ${port}`));
