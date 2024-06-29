import mongoose, { Document, Schema } from "mongoose";

interface IAnswer extends Document {
  userId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  content: string;
  parentAnswer: mongoose.Types.ObjectId | null;
  replies: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const answerSchema: Schema<IAnswer> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    parentAnswer: { type: mongoose.Types.ObjectId, ref: 'Answer', default: null },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAnswer>("Answer", answerSchema);
