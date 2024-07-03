import mongoose, { Document, Schema } from "mongoose";

interface IAnswer extends Document {
  userId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  content: string;
  parentAnswer: mongoose.Types.ObjectId | null;
  replies: mongoose.Types.ObjectId[];
  upvote: number;
  isUpvoted: Map<string, boolean>;
  downvote: number;
  isDownvoted: Map<string, boolean>;
  report: number;
  reportedBy: mongoose.Types.ObjectId[];
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
    upvote: {
      type: Number,
      default: 0,
    },
    isUpvoted: {
      type: Map,
      of: Boolean,
      default: {},
    },
    downvote: {
      type: Number,
      default: 0,
    },
    isDownvoted: {
      type: Map,
      of: Boolean,
      default: {},
    },
    report: {
      type: Number,
      default: 0,
    },
    reportedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAnswer>("Answer", answerSchema);
