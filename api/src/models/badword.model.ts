import mongoose, { Schema, Document } from "mongoose";

interface IBadWord extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  word: string;
  isApproved: boolean;
}

const BadWordSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  word: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
});

export default mongoose.model<IBadWord>("BadWord", BadWordSchema);
