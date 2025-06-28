import express from "express";
import { USER_ROUTE } from "../utils/route.enum";
import { loginUser, registerUser } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const userRouter = express.Router();

userRouter.post(USER_ROUTE.register, authMiddleware, registerUser);
userRouter.post(USER_ROUTE.login, loginUser);
