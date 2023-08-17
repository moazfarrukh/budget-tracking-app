import express, { Express } from 'express';
import userRouter from './src/routes/user';
import mongoose from "mongoose";
import passport from 'passport';
import cookieParser from 'cookie-parser';'cookie-parser'
import cors from 'cors'
import budgetRouter from './src/routes/budget';

require("./src/middleware/JwtStratergy")
require("./src/middleware/LocalStrategy")
require("./src/middleware/authentication")



// connect mongodb
const conn_string: string = "mongodb://127.0.0.1:27017/budget-app"
const connect = mongoose.connect(conn_string);
connect.then(db => console.log("connected to db")).catch(err => {
  console.log(err);
})


//express server
const app: Express = express();
const port: number =8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// setup cors
const options: cors.CorsOptions = {
  origin: '*'
};

app.use(cors(options));
app.use(cookieParser(process.env.COOKIE_SECRET as string))

app.use(passport.initialize())

// setup routes
app.use("/user", userRouter);
app.use("/budget",budgetRouter)

// listen to port
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});