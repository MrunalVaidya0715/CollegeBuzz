import { Response, Request, NextFunction } from "express";
import { CustomRequest } from "../middleware/jwt";
import Badword from "../models/badword.model";

export const addWord = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { word } = req.body;
    const newWord = new Badword({ userId, word });
    const savedWord = await newWord.save();
    res
      .status(200)
      .send({ message: "Word added Successfully", word: savedWord });
  } catch (error) {
    next(error);
  }
};
