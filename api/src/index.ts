import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Express = express();
dotenv.config();


const allowedOrigins = ["http://localhost:5173"];

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions));
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

app.use('/', (req, res, next) => {
    res.send("Reserved for College-Buzz");
});



const port = process.env.PORT || 8800;
app.listen(port, () => {
    console.log(`[server]: Dapper-Street Backend Server is Running at ${port}`);
});