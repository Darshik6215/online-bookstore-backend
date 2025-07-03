import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import { COMMON_ROUTE } from "./utils/route.enum";
import { userRouter } from "./routes/user.route";
import { bookRouter } from "./routes/book.route";

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use(COMMON_ROUTE.auth, userRouter);
app.use(COMMON_ROUTE.book, bookRouter);

// Port
app.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});
