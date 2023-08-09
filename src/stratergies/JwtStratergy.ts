import { ExtractJwt, Strategy as JwtStratergy, StrategyOptions, VerifiedCallback } from "passport-jwt";
import userModel from "../models/user.model";
import passport from "passport";
import { Secret } from "jsonwebtoken";
import * as dotenv from 'dotenv'
// set environment variables from .env file
dotenv.config()

console.log(process.env.JWT_SECRET)

const options: StrategyOptions =
{
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}
passport.use(
    new JwtStratergy(options, (payload, done: VerifiedCallback) => {
        userModel.findById(payload._id).then((user: any) => {
            if (user) {
                return done(null, user)
            }
        }).catch((err: any) => {
            return done(err, false, {
                message: 'Token not matched.'
            })
        })

    })

)
