import userModel from "../models/user.model";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";


passport.use(new LocalStrategy({usernameField: 'email',},userModel.authenticate()))

passport.serializeUser(userModel.serializeUser() as any)

passport.deserializeUser(userModel.deserializeUser())