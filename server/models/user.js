import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      max:50,
      unique:true,
    }
  },
  { timestamp: true }
);

const User = mongoose.model('User',UserSchema);

export default User;
