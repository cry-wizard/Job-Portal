import express from "express";
import {
  applyToJob,
  getApplicantsForJob,
  updateApplicationStatus,
} from "../controllers/application.controller.js";

import {
  protect,
  recruiterOnly,
} from "../middleware/auth.middleware.js";

import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

// Applicant applies
router.post(
  "/apply",
  protect,
  upload.single("resume"),
  applyToJob
);

// Recruiter views applicants
router.get(
  "/job/:jobId",
  protect,
  recruiterOnly,
  getApplicantsForJob
);

// Recruiter updates status
router.put(
  "/:id/status",
  protect,
  recruiterOnly,
  updateApplicationStatus
);

export default router;