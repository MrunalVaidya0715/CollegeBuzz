import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../middleware/jwt";
import Answer from "../models/answer.model";
import Question from "../models/question.model";
import createError from "../utils/createError";

export const createAnswer = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const questionId = req.params.id;
    const { content, parentAnswerId } = req.body;

    const newAnswer = new Answer({
      userId,
      questionId,
      content,
      parentAnswer: parentAnswerId || null,
    });

    const savedAnswer = await newAnswer.save();

    if (parentAnswerId) {
      await Answer.findByIdAndUpdate(parentAnswerId, {
        $push: { replies: newAnswer._id },
      });
    } else {
      await Question.findByIdAndUpdate(questionId, {
        $push: { answers: newAnswer._id },
      });
    }

    res
      .status(201)
      .send({ message: "Answer has been uploaded", answer: savedAnswer });
  } catch (error) {
    next(error);
  }
};

export const getAnswers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { questId } = req.params;

    const answers = await Answer.find({ questId, parentAnswer: null })
      .populate({
        path: "userId",
        select: "username profileImg"
      })

    res.status(200).send(answers);
  } catch (error) {
    next(error);
  }
};
