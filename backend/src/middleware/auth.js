import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

// Middleware function to authenticate a token
const authenticateToken = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers["authorization"];

  // Extract the token from the header, if it exists
  const token = authHeader && authHeader.split(" ")[1];

  // If no token is found, send a 401 (Unauthorized) response
  if (!token) return res.sendStatus(401);

  // Verify the token using the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // If verification fails, send a 403 (Forbidden) response
    if (err) return res.sendStatus(403);

    // If verification is successful, attach the user object to the request
    req.user = user;

    // Call the next middleware or route handler
    next();
  });
};

export default authenticateToken;
