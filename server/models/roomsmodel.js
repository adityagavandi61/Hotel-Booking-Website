import mongoose from "mongoose";
import { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    addphoto: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    bed:String,
    perks: [String],
    description: String,
    CheckIn:Number,
    CheckOut:Number,
    MaxGuestAdult:Number,
    MaxGuestChild:Number,
  },
  {
    timestamp: true,
  }
);
const Room = mongoose.model("Room", roomSchema);

export default Room;