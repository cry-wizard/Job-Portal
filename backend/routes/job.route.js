import express from "express";
import {
  createJob,
  getAllJobs,
} from "../controllers/job.controller.js";

import {
  protect,
  recruiterOnly,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route
router.get("/", getAllJobs);

// Recruiter only
router.post("/", protect, recruiterOnly, createJob);

export default router;