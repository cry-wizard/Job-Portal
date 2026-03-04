import Application from "../models/Application.js";
import Job from "../models/Job.js";


// Apply to Job
export const applyToJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Resume is required",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resume: req.file.path,
      coverLetter,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Recruiter/Admin View Applicants for Their Job
export const getApplicantsForJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("applicant", "name email phone")
      .populate("job", "title company");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Status
export const updateApplicationStatus = async (req, res) => {
  try {
    if (!req.body || !req.body.status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};