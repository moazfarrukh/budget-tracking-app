import express, { Response, Request, NextFunction } from 'express';
import { UserSignUp, getUser, userLogIn, userLogOut, userRefreshToken } from '../controllers/user-controller';
import passport from 'passport';
import { verifyUser } from '../middleware/authentication';

const userRouter = express.Router();

userRouter.post("/signup", UserSignUp);
userRouter.post("/login", passport.authenticate("local", { session: false }), userLogIn);

userRouter.post("/refresh-token", userRefreshToken)
userRouter.get("/logout", verifyUser, userLogOut)





export default userRouter;