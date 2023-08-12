import { Response, Request, NextFunction } from "express";
import userModel from "../models/user.model";
import {
    COOKIE_OPTIONS,
    getRefreshToken,
    getToken,
} from "../middleware/authentication";
import jsonwebtoken, { JwtPayload, Secret } from "jsonwebtoken";
import { ReqUser } from "../types/user";
import * as dotenv from "dotenv";

dotenv.config();

const User = userModel;

const REFRESH_TOKEN_SECRET: Secret = process.env.REFRESH_TOKEN_SECRET as string;

export const getUser = (req: Request, res: Response) => {
    res.json({ id: req.params.id });
};
export const UserSignUp = (req: Request, res: Response, next: NextFunction) => {
    User.register(new User(req.body), req.body.password, (err, user) => {
        if (err) {
            res.statusCode = 500;
            res.send(err);
            next(err);
        } else {
            const token = getToken({ _id: user._id });
            const refreshToken = getRefreshToken({ _id: user._id });
            user.refreshToken.push({ refreshToken });

            user
                .save(req.body)
                .then(() => {
                    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                    res.send({ success: true, token });
                    next(err);
                })
                .catch((err: any) => {
                    res.statusCode = 500;
                    res.send(err);
                    next(err);
                });
        }
    });
};

export const userLogIn = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.user !== "undefined") {
        const requestUser = req.user as ReqUser;
        const token = getToken({ _id: requestUser._id });
        const refreshToken = getRefreshToken({ _id: requestUser._id });
        User.findById(requestUser._id)
            .then((user: any) => {
                user.refreshToken.push({ refreshToken });
                user
                    .save()
                    .then(() => {
                        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                        res.send({ success: true, token });
                    })
                    .catch((err: any) => {
                        res.statusCode = 500;
                        res.send(err);
                        next(err);
                    });
            })
            .catch((err: any) => {
                res.send(err);
                next(err);
            });
    }
};

export const userRefreshToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const refreshToken = req.signedCookies.refreshToken;
    if (typeof refreshToken !== "undefined") {
        try {
            const payload = jsonwebtoken.verify(refreshToken, REFRESH_TOKEN_SECRET);
            const user_id: string = (payload as JwtPayload)._id;
            User.findById(user_id)
                .then((user: any) => {
                    if (user) {
                        const tokenIndex = user.refreshToken.findIndex(
                            (item: any) => item.refreshToken === refreshToken
                        );
                        if (tokenIndex === -1) {
                            res.statusCode = 401;
                            res.send("unauthorized token not found ");
                        } else {
                            const token = getToken({ _id: user_id });
                            const newRefreshToken = getRefreshToken({ _id: user_id });
                            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
                            user
                                .save()
                                .then(() => {
                                    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                                    res.send({ success: true, token });
                                })
                                .catch((err: any) => {
                                    res.statusCode = 500;
                                    res.send(err);
                                    next(err);
                                });
                        }
                    } else {
                        res.statusCode = 401;
                        res.send("unauthorized user 404");
                    }
                })
                .catch((err: any) => {
                    res.statusCode = 401;
                    res.send(err);
                });
        } catch (error: any) {
            res.statusCode = 401;
            res.send(error);
        }
    } else {
        res.statusCode = 401;
        res.send("Unauthorized refresh token undefined");
    }
};

export const userLogOut = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.signedCookies.refreshToken;
    const reqUser = req.user as ReqUser;
    if (req.user !== undefined) {
        User.findById(reqUser._id)
            .then((user: any) => {
                const tokenIndex = user.refreshToken.findIndex(
                    (item: any) => item.refreshToken === refreshToken
                );
                if (tokenIndex !== -1) {
                    user.refreshToken.splice(tokenIndex, 1);
                }
                user
                    .save()
                    .then(() => {
                        res.clearCookie("refreshToken", COOKIE_OPTIONS);
                        res.send({ success: true });
                    })
                    .catch((err: any) => {
                        res.statusCode = 500;
                        res.send(err);
                        next(err);
                    });
            })
            .catch((err: any) => {
                next(err);
            });
    }
};
