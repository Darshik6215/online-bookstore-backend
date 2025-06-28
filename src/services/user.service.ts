import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { USER_ROLE } from "../models/types/user.types";
import { COMMON_MESSAGE } from "../utils/messages.enum";

export const registerUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingAdmin = await User.findOne({ role: USER_ROLE.ADMIN });

    if (existingAdmin) {
      if (!req.user || req.user.role !== USER_ROLE.ADMIN) {
        res.status(403).json(COMMON_MESSAGE.Forbidden);
        return;
      }
    }

    const { firstName, lastName, email, password, phone, address, role } =
      req.body;

    if (!firstName || !lastName || !email || !password || !phone || !address) {
      res.status(400).json(COMMON_MESSAGE.All_Fields);
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(409)
        .json(COMMON_MESSAGE.Already_exist.replace("${param}", "Email"));
      return;
    }

    if (role === USER_ROLE.ADMIN) {
      const adminExists = await User.findOne({ role: USER_ROLE.ADMIN });
      if (adminExists) {
        res
          .status(409)
          .json(COMMON_MESSAGE.Already_exist.replace("${param}", "Admin"));
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

    res
      .status(201)
      .json({ message: COMMON_MESSAGE.Success, user: newUser, token });
  } catch (error: any) {
    res.status(500).json({
      message: COMMON_MESSAGE.ServerError,
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
      res.status(400).json(COMMON_MESSAGE.All_Fields);
      return;
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(401).json(COMMON_MESSAGE.EMAIL_PASSWORD);
      return;
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      res.status(401).json(COMMON_MESSAGE.EMAIL_PASSWORD);
      return;
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
      message: COMMON_MESSAGE.Success,
      user: hidePassword,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: COMMON_MESSAGE.ServerError,
      error: error.message,
    });
  }
};
