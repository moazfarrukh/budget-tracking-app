import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

interface ISession {
  refreshToken: string
}


interface IUser {
  firstName: string
  lastName: string
  authStrategy: string
  refreshToken: ISession[]
}

const Session = new Schema<ISession>({
  refreshToken: {
    type: String, default: ""
  }
})

const User = new Schema<IUser>({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [Session],
  },
});

User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
});


User.plugin(passportLocalMongoose)





export default mongoose.model("User", User);