import {HfInference} from "@huggingface/inference"
import dotenv from "dotenv";
dotenv.config();

const hf = new HfInference(process.env.HF_AT)

const createEmbedding = async (text: string) => {
  const embedding = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: text,
  });
  return embedding;
};

export default createEmbedding;
