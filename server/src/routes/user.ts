import express, { Response, Request, NextFunction } from 'express';
import { UserSignUp, getUser, userLogIn, userLogOut, userRefreshToken } from '../controllers/user-controller';
import passport from 'passport';
import { verifyUser } from '../middleware/authentication';

const userRouter = express.Router();

userRouter.post("/signup", UserSignUp);
userRouter.post("/login", passport.authenticate("local", { session: false }), userLogIn);

userRouter.post("/refresh-token", userRefreshToken)
userRouter.get("/logout", verifyUser, userLogOut)

userRouter.get("/", (req: Request, res: Response) => { res.send("adsfadsf") });
userRouter.get("/me", verifyUser, (req: Request, res: Response, next: NextFunction) => {
    res.send(req.user)
})

userRouter.get("/:id", getUser);


export default userRouter;