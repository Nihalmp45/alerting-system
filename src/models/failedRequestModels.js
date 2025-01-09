import mongoose  from "mongoose";

const failedRequestSchema = new mongoose.Schema({
  ip: String,
  reason: String,
  timestamp: { type: Date, default: Date.now },
});

export default  mongoose.model("FailedRequest", failedRequestSchema);