import { Request, Response, NextFunction } from "express";
import createEmbedding from "../utils/createEmbedding";
import Question from "../models/question.model";
import { CustomRequest } from "../middleware/jwt";
import createError from "../utils/createError";
import mongoose from "mongoose";
import Answer from "../models/answer.model";

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
    const {
      branch = "All",
      category = "all",
      sortBy = "latest",
      page,
    } = req.query;
    const limit = 4;
    const filter: any = {};

    if (branch !== "All") {
      filter.branch = branch;
    }

    if (category !== "all") {
      filter.category = category;
    }

    let sortOptions: any = { createdAt: -1 };

    switch (sortBy) {
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "votesHighToLow":
        sortOptions = { vote: -1 };
        break;
      case "votesLowToHigh":
        sortOptions = { vote: 1 };
        break;
      default:
        break;
    }

    const pageNumber = parseInt(page as string, 10) || 1;

    const questions = await Question.aggregate([
      { $match: filter },
      {
        $addFields: {
          vote: { $subtract: ["$upvote", "$downvote"] },
        },
      },
      { $sort: sortOptions },
      {
        $project: {
          embedding: 0,
          isUpvoted: 0,
          isDownvoted: 0,
          report: 0,
          reportedBy: 0,
          answers: 0,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: "$userId",
      },
      { $skip: (pageNumber - 1) * limit },
      { $limit: limit },
    ]);
    const totalQuestions = await Question.countDocuments(filter);
    const totalPages = Math.ceil(totalQuestions / limit);

    res.status(200).send({
      questions,
      totalPages: totalPages,
      currentPage: pageNumber,
    });
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
    if (!mongoose.Types.ObjectId.isValid(quesId)) {
      return next(createError(404, "Question not found"));
    }
    const question = await Question.findById(quesId)
      .select("-embedding")
      .populate("userId");
    if (!question) {
      return next(createError(404, "Question not found"));
    }
    res.status(200).send(question);
  } catch (error) {
    next(error);
  }
};

export const getTopQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topQuestions = await Question.aggregate([
      {
        $addFields: {
          vote: { $subtract: ["$upvote", "$downvote"] },
        },
      },
      {
        $sort: { vote: -1 },
      },
      {
        $project: {
          title: 1,
          vote: 1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    res.status(200).send(topQuestions);
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
    const quesId = req.params.id;
    const userId = req.userId;
    if (!userId) {
      return next(createError(401, "UserId is required"));
    }
    const question = await Question.findById(quesId);

    if (!question) {
      return next(createError(404, "Question not found"));
    }

    const isDownvoted = question.isDownvoted.get(userId) || false;
    const isUpvoted = question.isUpvoted.get(userId) || false;

    if (isDownvoted) {
      question.isDownvoted.set(userId, false);
      question.downvote -= 1;
    }

    if (isUpvoted) {
      question.isUpvoted.set(userId, false);
      question.upvote -= 1;
    } else {
      question.isUpvoted.set(userId, true);
      question.upvote += 1;
    }

    await question.save();

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
    const quesId = req.params.id;
    const userId = req.userId;
    if (!userId) {
      return next(createError(401, "UserId is required"));
    }
    const question = await Question.findById(quesId);

    if (!question) {
      return next(createError(404, "Question not found"));
    }

    const isUpvoted = question.isUpvoted.get(userId) || false;
    const isDownvoted = question.isDownvoted.get(userId) || false;

    if (isUpvoted) {
      question.isUpvoted.set(userId, false);
      question.upvote -= 1;
    }

    if (isDownvoted) {
      question.isDownvoted.set(userId, false);
      question.downvote -= 1;
    } else {
      question.isDownvoted.set(userId, true);
      question.downvote += 1;
    }

    await question.save();

    res.status(200).send({
      message: "Downvoted",
    });
  } catch (error) {
    next(error);
  }
};

export const editQuestion = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const quesId = req.params.id;
    const userId = req.userId;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(quesId)) {
      return next(createError(404, "Question not found"));
    }

    const question = await Question.findById(quesId);

    if (!question) {
      return next(createError(404, "Question not found"));
    }

    if (question.userId._id.toString() !== userId) {
      return next(createError(401, "Only Question owner can edit"));
    }

    if (title) question.title = title;
    if (description) question.description = description;
    if (title || description) {
      const embedding = await createEmbedding(title + ". " + description);
      question.embedding = embedding as number[];
    }

    const updatedQuestion = await question.save();

    res.status(200).send({
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const quesId = req.params.id;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(quesId)) {
      return next(createError(404, "Question not found"));
    }

    const question = await Question.findById(quesId);

    if (!question) {
      return next(createError(404, "Question not found"));
    }

    if (question.userId.toString() !== userId) {
      return next(createError(403, "Only Question owner can delete"));
    }
    await Answer.deleteMany({questionId: quesId});

    await Question.findByIdAndDelete(quesId);

    res.status(200).send({
      message: "Question deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestionsToContribute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { branch = "All", category = "all", sortBy = "latest" } = req.query;

    const filter: any = {};

    if (branch !== "All") {
      filter.branch = branch;
    }

    if (category !== "all") {
      filter.category = category;
    }

    let sortOptions: any = { createdAt: 1 };

    switch (sortBy) {
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "votesHighToLow":
        sortOptions = { vote: -1 };
        break;
      case "votesLowToHigh":
        sortOptions = { vote: 1 };
        break;
      default:
        break;
    }

    const questions = await Question.aggregate([
      { $match: filter },
      {
        $addFields: {
          vote: { $subtract: ["$upvote", "$downvote"] },
        },
      },
      { $sort: sortOptions },
      {
        $project: {
          embedding: 0,
          report: 0,
          reportedBy: 0,
          isUpvoted: 0,
          isDownvoted: 0,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: "$userId",
      },
      {
        $match: {
          answers: { $exists: true, $size: 0 },
        },
      },
    ]);

    res.status(200).send(questions);
  } catch (error) {
    next(error);
  }
};

export const getUserQuestions = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const questions = await Question.find({ userId: userId })
      .select("-embedding")
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).send(questions);
  } catch (error) {
    next(error);
  }
};

export const handleQuestionReport = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const quesId = req.params.id;
    const userId = req.userId;
    if (!userId) {
      return next(createError(401, "UserId is required"));
    }
    const { reason } = req.body;
    const question = await Question.findById(quesId);
    if (!question) {
      return next(createError(404, "Question not found"));
    }
    let isPresent = question.reportedBy.some(
      (report) => report.userId.toString() === userId
    );
    if (isPresent) {
      question.reportedBy = question.reportedBy.filter(
        (report) => report.userId.toString() !== userId
      );
      question.report -= 1;
    } else {
      question.reportedBy.push({
        userId: new mongoose.Types.ObjectId(userId),
        reason,
      });
      question.report += 1;
    }
    await question.save();
    res
      .status(200)
      .send({
        message: `${isPresent ? "Question Unreported" : "Question Reported"}`,
      });
  } catch (error) {
    next(error);
  }
};

export const getQuestionsBySearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(200).json([]);
    }

    const filter: any = {};
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { branch: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ];
    }

    const questions = await Question.find(filter).select(
      " title category branch"
    );
    res.status(200).send(questions);
  } catch (error) {
    next(error);
  }
};
