import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import User, { IUser } from "../models/user.model";

export const handleGoogleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, profileImg, exp} = req.body;

    let user: IUser | null = await User.findOne({ email });

    if (!user) {
      const newUser = new User({
        username,
        email,
        profileImg,
      });

      user = await newUser.save();
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_KEY as string,
      { expiresIn: exp }
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(201)
      .send(user);
  } catch (error) {
    next(error);
  }
};


export const logout = async (req: Request, res: Response) => {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out");
  };