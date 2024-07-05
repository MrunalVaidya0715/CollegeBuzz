import { Response, Request, NextFunction } from "express";
import { CustomRequest } from "../middleware/jwt";
import Answer from "../models/answer.model";
import Question from "../models/question.model";
import createError from "../utils/createError";
import User from "../models/user.model";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("username profileImg createdAt");
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const getUserProfileQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const questions = await Question.find({ userId: userId })
      .select("-embedding")
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).send(questions);
  } catch (error) {
    next(error);
  }
};
