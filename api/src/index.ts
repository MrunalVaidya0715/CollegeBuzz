import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";

import authRoute from './routes/auth.route'
import questionRoute from './routes/question.route'
import answerRoute from './routes/answer.route'

const app: Express = express();
dotenv.config();

mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO as string);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
};

const allowedOrigins = ["http://localhost:5173", "https://college-buzzz.vercel.app"];

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions));
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());



app.use('/api/auth', authRoute)
app.use('/api/questions', questionRoute)
app.use('/api/answers', answerRoute)

app.use('/', (req, res, next) => {
    res.send("Reserved for College-Buzz");
});



const port = process.env.PORT || 8800;
app.listen(port, () => {
    connect();
    console.log(`[server]: College-Buzzz Backend Server is Running at ${port}`);
});