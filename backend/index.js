import cors from "cors";
import express from "express";

import articleRouter from "./src/routes/articles_routes.js";
import userRouter from "./src/routes/users_routes.js";

const app = express();

// Port set up
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("hello");
});

// Mounting router
app.use("/v1/users", userRouter);
app.use("/v1/articles", articleRouter);

// Server Listening
app.listen(port, () => console.log(`app listening on port ${port}`));
