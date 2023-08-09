import userModel from "../models/user.model";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";


// called during user authentication
passport.use(new LocalStrategy({usernameField: 'email',},userModel.authenticate()))

// called after logging
passport.serializeUser(userModel.serializeUser() as any)