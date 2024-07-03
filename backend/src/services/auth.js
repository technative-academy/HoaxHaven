import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import pool from "../db.js";

dotenv.config();

// Function to generate an access token that expires in 15 mins
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

// Function to generate a refresh token that expires in 7 days
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const registerUser = async (name, email, password, bio) => {
  // Check if the email already exists
  const emailCheckResult = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  if (emailCheckResult.rows.length > 0) {
    throw new Error("Email already exists");
  }

  // If the email does not exist, proceed with registration
  // hash the password and insert the new user into the database
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (name, email, password, bio) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, hashedPassword, bio]
  );

  // Return the newly created user
  return result.rows[0];
};

const loginUser = async (email, password) => {
  // Query the database for the user with the provided email
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  const user = result.rows[0];

  // If the user exists and the password matches, generate access and refresh tokens
  if (user && (await bcrypt.compare(password, user.password))) {
    const userData = { id: user.id, email: user.email };
    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);

    return {
      id: user.id,
      name: user.name,
      accessToken,
      refreshToken,
    };
  }

  // Throw an error if the email or password is invalid
  throw new Error("Invalid email or password");
};

const refreshAccessToken = async (refreshToken) => {
  try {
    // Verify the refresh token
    const user = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const userData = { id: user.id, email: user.email };
    // Generate and return a new access token
    return generateAccessToken(userData);
  } catch (err) {
    // Throw an error if the refresh token is invalid
    throw new Error("Invalid refresh token");
  }
};

export { registerUser, loginUser, refreshAccessToken };
