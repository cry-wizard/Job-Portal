import express from "express";
import {
  createJob,
  getAllJobs,
  deleteJob
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
router.delete("/:id", protect, recruiterOnly, deleteJob);

export default router;