import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleApply = async (jobId) => {
  try {
    const formData = new FormData();

    formData.append("jobId", jobId);
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);

    await API.post("/applications/apply", formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Application submitted!");

    setActiveJob(null);
    setResume(null);
    setCoverLetter("");

  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Failed to apply");
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Job Portal</h1>

        <div className="flex gap-3">
          {/* Recruiter Create Job Button */}
          {role === "recruiter" && (
            <>
              <button
                onClick={() => navigate("/create-job")}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Create Job
              </button>

              <button
                onClick={() => navigate("/my-jobs")}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                My Jobs
              </button>
            </>
          )}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Job Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-md rounded-xl p-6 border"
            >
              <h2 className="text-xl font-bold">{job.title}</h2>

              <p className="text-gray-600">{job.company}</p>

              <p className="text-sm text-gray-500 mt-2">📍 {job.location}</p>

              <p className="text-sm text-gray-500">💰 {job.salary}</p>

              <p className="text-sm text-gray-500">🕒 {job.type}</p>

              <p className="text-sm mt-3 text-gray-600">{job.description}</p>

              <p className="text-xs text-gray-400 mt-3">
                Posted by: {job.postedBy?.name}
              </p>

              {/* Apply Button */}
              {role === "user" && (
                <button
                  onClick={() =>
                    setActiveJob(activeJob === job._id ? null : job._id)
                  }
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Apply
                </button>
              )}

              {/* Apply Form */}
              {activeJob === job._id && (
                <div className="mt-4 border-t pt-4 space-y-3">
                  <textarea
                    placeholder="Write your cover letter..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full border rounded p-2"
                  />

                  <input
                    type="file"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="w-full"
                  />

                  <button
                    onClick={() => handleApply(job._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Submit Application
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
