import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      message: "Status must be either 'pending', 'accepted', or 'rejected'",
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Connection = mongoose.model("Connection", connectionSchema);
export default Connection;
