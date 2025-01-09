import mongoose  from "mongoose";

const failedRequestCountSchema = new mongoose.Schema({
  ip: String,
  count: { type: Number, default: 0 },
  firstFailureTime: { type: Date, default: Date.now },
});

export default  mongoose.model("FailedRequestCount", failedRequestCountSchema);