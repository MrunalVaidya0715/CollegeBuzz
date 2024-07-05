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
      .select("title branch category upvote downvote createdAt")
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).send(questions);
  } catch (error) {
    next(error);
  }
};

export const getUserProfileAnswers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.userId;
      const answers = await Answer.find({ userId: userId })
        .select(" upvote downvote createdAt")
        .populate("userId")
        .populate({path: "questionId", select: "title"})
        .sort({ createdAt: -1 });
      res.status(200).send(answers);
    } catch (error) {
      next(error);
    }
  };
