import express, { Express } from 'express';
import userRouter from './src/routes/user';
import mongoose from "mongoose";
import passport from 'passport';
import cookieParser from 'cookie-parser';'cookie-parser'
import cors from 'cors'
import budgetRouter from './src/routes/budget';
import { verifyUser } from './src/utils/authentication';

require("./src/stratergies/LocalStrategy")
require("./src/stratergies/JwtStratergy")
require("./src/utils/authentication")





// connect mongodb
const conn_string: string = "mongodb://127.0.0.1:27017/budget-app"
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
app.use(cookieParser("jhdshhds884hfhhs-euhdhjd"))

app.use(passport.initialize())

// setup routes
app.use("/user", userRouter);
app.use("/budget",verifyUser,budgetRouter)

// add list to por
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});