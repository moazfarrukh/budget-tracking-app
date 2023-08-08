import express, { Express } from 'express';
import dotenv from 'dotenv';
import userRouter from './src/routes/users';
import mongoose from "mongoose";
import passport from 'passport';
require("./src/stratergies/LocalStrategy")
require("./src/stratergies/JwtStratergy")

import cors from 'cors'

// set environment variables from .env file
dotenv.config();
console.log(process.env)
// connect mongodb
const conn_string: string = "mongodb://127.0.0.1:27017/users"
const connect = mongoose.connect(conn_string);
connect.then(db => console.log("connected to db")).catch(err => {
  console.log(err);
})


//express server
const app: Express = express();
const port: number = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// setup cors
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));



// setup routes
app.use(passport.initialize())
app.use("/user", userRouter);


// add list to por
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});