import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
    },
    price:Number,
    checkIn: Date,
    checkOut: Date,
    adultGuest: Number,
    childGuest: Number,
  },
  {
    timestamp: true,
  }
);
const Book = mongoose.model("Book", bookSchema);

export default Book;
