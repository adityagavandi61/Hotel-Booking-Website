import mongoose from "mongoose";
import { Schema } from "mongoose";

const advertisedSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    URL:{
        type:URL,
        require
    },
    img:{
        type: [String],
        required: true,
    },
  },
  {
    timestamp: true,
  }
);
const Advertised = mongoose.model("Advertised", advertisedSchema);

export default Advertised;

