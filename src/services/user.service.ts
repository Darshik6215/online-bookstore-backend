import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { USER_ROLE } from "../models/types/user.types";

export const registerUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingAdmin = await User.findOne({ role: USER_ROLE.ADMIN });

    if (existingAdmin) {
      if (!req.user || req.user.role !== USER_ROLE.ADMIN) {
        res.status(403).json({
          message: "❌ Forbidden: Only admins can create new users",
        });
        return;
      }
    }

    const { firstName, lastName, email, password, phone, address, role } =
      req.body;

    if (!firstName || !lastName || !email || !password || !phone || !address) {
      res.status(400).json({
        message: "❌ All required fields must be provided",
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        message: "❌ A user already exists with this email",
      });
      return;
    }

    if (role === USER_ROLE.ADMIN) {
      const adminExists = await User.findOne({ role: USER_ROLE.ADMIN });
      if (adminExists) {
        res.status(409).json({
          message: "❌ Admin already exists",
        });
        return;
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
      role: role || USER_ROLE.USER,
    });

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      message: "✅ User registered successfully",
      user: newUser,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "❌ Failed to register user",
      error: error.message,
    });
  }
};

export const loginUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "❌ All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        message: "❌ Email or Password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "❌ Email or Password is incorrect",
      });
    }

    const token = jwt.sign(
      { id: existingUser.id, role: existingUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    const hidePassword = await User.findById(existingUser.id).select(
      "-password"
    );

    res.status(200).json({
      message: "✅ Login successful",
      user: hidePassword,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "❌ Login failed",
      error: error.message,
    });
  }
};
