import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState({});

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (jobId) => {
    const confirmDelete = window.confirm("Delete this job?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job deleted");

      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (error) {
      alert("Failed to delete job");
    }
  };
  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");

      setJobs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplicants = async (jobId) => {
    try {
      const res = await API.get(`/applications/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplicants({
        ...applicants,
        [jobId]: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}

      <div className="bg-white shadow p-4 flex justify-between">
        <button
          onClick={() => navigate("/home")}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>

        <h1 className="text-xl font-bold">My Jobs</h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Jobs Grid */}

      <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white shadow rounded p-5">
            <h2 className="text-lg font-bold">{job.title}</h2>

            <p className="text-gray-600">{job.company}</p>

            <p className="text-sm text-gray-500">{job.location}</p>

            <div className="flex gap-2 mt-3">

              <button
                onClick={() => deleteJob(job._id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>

            <button
              onClick={() => fetchApplicants(job._id)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
            >
              View Applicants
            </button>

            {/* Applicants */}

            {applicants[job._id] && (
              <div className="mt-4 space-y-3">
                {applicants[job._id].map((app) => (
                  <ApplicantItem key={app._id} app={app} token={token} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;

/* ===========================
   Applicant Item Component
=========================== */

const ApplicantItem = ({ app, token }) => {
  const [status, setStatus] = useState(app.status);

  const updateStatus = async () => {
    try {
      await API.put(
        `/applications/${app._id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Status updated");
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="border p-3 rounded bg-gray-50">
      <p className="font-semibold">{app.applicant.name}</p>

      <p className="text-sm text-gray-600">{app.applicant.email}</p>

      <p className="text-sm mt-1">Cover Letter: {app.coverLetter}</p>

      <a
        href={`${import.meta.env.VITE_BACK_URL}/${app.resume}`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 text-sm"
      >
        View Resume
      </a>

      <p className="text-sm mt-1">
        Current Status:
        <span className="font-semibold ml-1">{app.status}</span>
      </p>

      {/* Status Controls */}

      <div className="flex gap-2 mt-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="Pending">Pending</option>

          <option value="Selected">Selected</option>

          <option value="Rejected">Rejected</option>
        </select>

        <button
          onClick={updateStatus}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};
