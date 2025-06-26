import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/db";

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Connection
connectDB();

// Routes

// Port
app.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});
