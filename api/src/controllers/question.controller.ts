import { Request, Response, NextFunction } from "express";
import createEmbedding from "../utils/createEmbedding";
import Question from "../models/question.model";
import { CustomRequest } from "../middleware/jwt";
import createError from "../utils/createError";
import mongoose from "mongoose";

export const embedQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    const embedding = await createEmbedding(title + ". " + description);

    res.status(201).send(embedding);
  } catch (error) {
    next(error);
  }
};

export const getSimilarQuestions = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { embedding, limit = 3, threshold = 0.8 } = req.body;
    const numCandidates = limit * 10;
    const similarQuestions = await Question.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: embedding,
          numCandidates: numCandidates,
          limit: parseInt(limit, 10),
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
      {
        $match: {
          score: { $gt: threshold },
        },
      },
    ]);

    res.status(200).send(similarQuestions);
  } catch (error) {
    next(error);
  }
};

export const createQuestion = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, branch, category, embedding } = req.body;
    const newQuestion = new Question({
      userId: req.userId,
      title,
      description,
      branch,
      category,
      embedding,
    });

    const savedQuestion = await newQuestion.save();
    res
      .status(201)
      .send({ message: "Question has been uploaded", question: savedQuestion });
  } catch (error) {
    next(error);
  }
};

export const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questions = await Question.find().select("-embedding").populate("userId");
    res.status(200).send(questions);
  } catch (error) {
    next(error);
  }
};

export const getQuestionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quesId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(quesId)){
      return next(createError(404, "Question not found"));
    }
    const question = await Question.findById(quesId).select("-embedding").populate("userId");
    if(!question){
      return next(createError(404, "Question not found"));
    }
    res.status(200).send(question)
  } catch (error) {
    next(error);
  }
};


