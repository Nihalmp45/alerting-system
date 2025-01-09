
import express from "express";
import { handleFailedRequest, getMetrics } from "../controllers/failedRequestController.js";

const router = express.Router();

// Route for handling POST requests
router.post("/submit", handleFailedRequest);

// Route for fetching metrics
router.get("/metrics", getMetrics);

export default router;
