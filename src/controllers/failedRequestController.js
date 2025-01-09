import FailedRequest from "../models/failedRequestModels.js";
import FailedRequestCount from "../models/failedRequestCountModel.js";
import nodemailer from "nodemailer";

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Helper to send email alerts
const sendAlert = (ip, count) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: "admin@example.com",
    subject: "Alert: High Failed POST Requests",
    text: `The IP address ${ip} has attempted and failed ${count} POST requests within the past 10 minutes, indicating potential issues or unauthorized activity.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error("Error sending email:", error);
    else console.log("Email sent:", info.response);
  });
};

// Function to log failed requests
const logFailedRequest = async (ip, reason) => {
  const timeWindow = 10 * 60 * 1000; // 10 minutes
  const threshold = 5;
  const now = Date.now();

  const failedRequest = await FailedRequestCount.findOne({ ip });

  if (failedRequest) {
    if (now - failedRequest.firstFailureTime <= timeWindow) {
      failedRequest.count += 1;

      if (failedRequest.count >= threshold) {
        sendAlert(ip, failedRequest.count);
      }
    } else {
      failedRequest.count = 1;
      failedRequest.firstFailureTime = now;
    }
    await failedRequest.save();
  } else {
    await FailedRequestCount.create({ ip, count: 1, firstFailureTime: now });
  }

  await FailedRequest.create({ ip, reason });
};

// Controller for handling POST requests
export const handleFailedRequest = async (req, res) => {
  const ip = req.ip;
  const { headers } = req;

  // Check for a valid token
  const validToken = headers["x-access-token"] === "123";
  if (!validToken) {
    await logFailedRequest(ip, "Invalid token");
    return res.status(401).send("Unauthorized: Invalid token");
  }

  res.send("Request processed successfully");
};

// Controller to fetch metrics
export const getMetrics = async (req, res) => {
  const metrics = await FailedRequest.find().sort({ timestamp: -1 });
  res.json(metrics);
};