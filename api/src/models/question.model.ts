import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  branch: string;
  category: string;
  upvote: number;
  isUpvoted: Map<string, boolean>;
  downvote: number;
  isDownvoted: Map<string, boolean>;
  report: number;
  reportedBy: mongoose.Types.ObjectId[];
  answers: mongoose.Types.ObjectId[];
  embedding: number[];
  createdAt?: Date;
  updatedAt?: Date;
}

const questionSchema: Schema<IQuestion> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    category: {
      type: String,
      required: true,
    },
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
    answers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
    }],
    embedding: {
      type: [Number],
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IQuestion>('Question', questionSchema);
