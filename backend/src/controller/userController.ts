import bcrypt from "bcrypt";
import User from "../model/userModel";
import { Request, Response } from "express";
import { StatusCode } from "../utils/statusCodes";

export class UserController {
  static async userRegistration(req: Request, res: Response) {
    try {
      const { name, email, password, password_confirmation } = req.body;

      if (!name || !email || !password || !password_confirmation) {
        res.status(StatusCode.BAD_REQUEST).json({
          status: "error",
          msg: "Please enter the required field",
        });
        return;
      }

      if (password !== password_confirmation) {
        res.status(StatusCode.BAD_REQUEST).json({
          status: "error",
          msg: "Passwords do not match",
        });
        return;
      }

      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        res.status(StatusCode.BAD_REQUEST).json({
          status: "error",
          msg: "Email already exists",
        });
        return;
      }

      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(StatusCode.SUCCESS).json({
        status: "success",
        msg: "Registration success!",
        user: {
          id: newUser._id,
          email: newUser.email,
          created_at: newUser.createdAt,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        status: "failed",
        msg: "Unable to register, please try again later!",
      });
    }
  }

  // User Email Verification
  // User Login
  // Get new access token or refresh token
  // Change password
  // Profile or logged-in user
  // send password reset email
  // password reset
}
