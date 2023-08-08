import { ExtractJwt, Strategy, StrategyOptions,VerifiedCallback } from "passport-jwt";
import userModel from "../models/user.model";
import passport from "passport";

const options: StrategyOptions =
{
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "jdhdhd-kjfadsfsahrerj-uurhr-jjge"
}
passport.use(
    new Strategy(options,(payload,done:VerifiedCallback)=>{
        userModel.findOne({_id:payload._id}, (err:any,user:any)=>{
            if(err){
                return done(err,false)
            }
            if (user){
                return done(null,user)
            }else{ 
                return done(null,false)
            }
        })
    })
    
)
