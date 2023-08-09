import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

interface ISession {
  refreshToken: string
}


interface IUser {
  firstName: string
  lastName: string,
  budget_limit: number,
  refreshToken: ISession[]
}

const sessionSchema = new Schema<ISession>({
  refreshToken: {
    type: String, default: ""
  }
})

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  budget_limit: {
    type: Number,
    default: 0,
  }
  ,
  refreshToken: {
    type: [sessionSchema],
  },
});

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
});


userSchema.plugin(passportLocalMongoose,{ usernameField : 'email' })





export default mongoose.model("User", userSchema);