import jsonwebtoken, { Secret, SignOptions } from "jsonwebtoken";
import { CookieOptions } from "express";
import passport from "passport";
import * as dotenv from 'dotenv'
import { payload } from "../types/user";

dotenv.config();

const SECRET_KEY: Secret = process.env.JWT_SECRET as string

const REFRESH_TOKEN_SECRET: Secret = process.env.REFRESH_TOKEN_SECRET as string

export const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    signed: true,
    sameSite: "none",
}
export const getToken = (user: payload) => {
    return jsonwebtoken.sign(user, SECRET_KEY, {
        expiresIn: 60 * 15
    } as SignOptions)
}

export const getRefreshToken = (user: payload) => {
    return jsonwebtoken.sign(user, REFRESH_TOKEN_SECRET, {
        expiresIn: 1000 * 60 * 60 * 24 * 30
    } as SignOptions,)
}

export const verifyUser = passport.authenticate('jwt', {session: false})