import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../middleware/jwt";
import Answer from "../models/answer.model";
import Question from "../models/question.model";
import createError from "../utils/createError";
import mongoose from "mongoose";

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
    const quesId = req.params.id;

    const answers = await Answer.find({
      questionId: quesId,
      parentAnswer: null,
    })
      .populate({
        path: "userId",
        select: "username profileImg",
      })
      .populate({
        path: "replies",
        populate: {
          path: "userId",
          select: "username profileImg",
        },
      });

    res.status(200).send(answers);
  } catch (error) {
    next(error);
  }
};

export const handleUpVote = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const ansId = req.params.id;
    const userId = req.userId;
    if (!userId) {
      return next(createError(403, "UserId is required"));
    }
    const answer = await Answer.findById(ansId);

    if (!answer) {
      return next(createError(404, "Answer not found"));
    }

    const isDownvoted = answer.isDownvoted.get(userId) || false;
    const isUpvoted = answer.isUpvoted.get(userId) || false;

    if (isDownvoted) {
      answer.isDownvoted.set(userId, false);
      answer.downvote -= 1;
    }

    if (isUpvoted) {
      answer.isUpvoted.set(userId, false);
      answer.upvote -= 1;
    } else {
      answer.isUpvoted.set(userId, true);
      answer.upvote += 1;
    }

    await answer.save();

    res.status(200).send({
      message: "Upvoted",
    });
  } catch (error) {
    next(error);
  }
};

export const handleDownVote = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const ansId = req.params.id;
    const userId = req.userId;
    if (!userId) {
      return next(createError(403, "UserId is required"));
    }
    const answer = await Answer.findById(ansId);

    if (!answer) {
      return next(createError(404, "Answer not found"));
    }

    const isUpvoted = answer.isUpvoted.get(userId) || false;
    const isDownvoted = answer.isDownvoted.get(userId) || false;

    if (isUpvoted) {
      answer.isUpvoted.set(userId, false);
      answer.upvote -= 1;
    }

    if (isDownvoted) {
      answer.isDownvoted.set(userId, false);
      answer.downvote -= 1;
    } else {
      answer.isDownvoted.set(userId, true);
      answer.downvote += 1;
    }

    await answer.save();

    res.status(200).send({
      message: "Downvoted",
    });
  } catch (error) {
    next(error);
  }
};

export const editAnswer = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const ansId = req.params.id;
    const userId = req.userId;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(ansId)) {
      return next(createError(404, "Answer not found"));
    }

    const answer = await Answer.findById(ansId);

    if (!answer) {
      return next(createError(404, "Answer not found"));
    }

    if (answer.userId._id.toString() !== userId) {
      return next(createError(403, "Only Answer owner can edit"));
    }

    if (content) answer.content = content;

    const updatedAnswer = await answer.save();

    res.status(200).send({
      message: "Answer updated successfully",
      answer: updatedAnswer,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAnswer = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const ansId = req.params.id;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(ansId)) {
      return next(createError(404, "Answer not found"));
    }

    const answer = await Answer.findById(ansId);

    if (!answer) {
      return next(createError(404, "Answer not found"));
    }

    if (answer.userId.toString() !== userId) {
      return next(createError(403, "Only Answer owner can delete"));
    }

    await Answer.findByIdAndDelete(ansId);

    res.status(200).send({
      message: "Answer deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
