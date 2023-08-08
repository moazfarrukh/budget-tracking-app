import express, { Response, Request, NextFunction } from 'express';
import userModel from '../models/user.model';
import { COOKIE_OPTIONS, getRefreshToken, getToken } from '../utils/authentication';

const User = userModel;

interface ReqUser {
    _id: string,
}



export const getUser = (req: Request, res: Response) => {
    res.json({ id: req.params.id });
}
export const UserSignUp = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.firstName) {
        res.statusCode = 500;
        res.send({
            name: "No First Name Error",
            message: "The first name is required",
        })
    } else {
        User.register(new User(req.body), req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500
                res.send(err)
                next(err);
            } else {
                // user.firstName = req.body.firstName
                // user.lastName = req.body.lastName || ""
                const token = getToken({ _id: user._id })
                const refreshToken = getRefreshToken({ _id: user._id })
                user.save((req.body), (err: any) => {
                    if (err) {
                        res.statusCode = 500
                        res.send(err)
                        next(err);
                    } else {
                        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                        res.send({ success: true, token });
                        next(err);
                    }
                }
                )

            }
        })
    }
}
