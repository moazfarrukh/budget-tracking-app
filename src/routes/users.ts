import express, { Response, Request, NextFunction } from 'express';
import { UserSignUp, getUser } from '../controllers/user-controller';
import userModel from '../models/user.model';
import { COOKIE_OPTIONS, getRefreshToken, getToken } from '../utils/authentication';
const userRouter = express.Router();





userRouter.post("/signup",UserSignUp);


userRouter.get("/", (req: Request, res: Response) => { res.send("adsfadsf") });

userRouter.get("/:id", getUser);

export default userRouter;