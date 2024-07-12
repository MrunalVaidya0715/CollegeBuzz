import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
dotenv.config();

const hf = new HfInference(process.env.HF_AT2);

const createSummary = async (text: string): Promise<string> => {

    const summaryResponse = await hf.summarization({
        model: 'philschmid/bart-large-cnn-samsum',
        inputs: text || ""
    });

    return summaryResponse.summary_text;
};

export default createSummary;
