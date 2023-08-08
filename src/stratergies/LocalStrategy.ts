import userModel from "../models/user.model";
import { Strategy } from "passport-local";
import passport from "passport";
import express  from "express";

// called during user authentication
passport.use(new Strategy(userModel.authenticate()))

// called after logging
passport.serializeUser(userModel.serializeUser() as any)