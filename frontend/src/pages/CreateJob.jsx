import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    description: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/jobs", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job created successfully");

      navigate("/home");

    } catch (error) {
      alert(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">

        <button
          onClick={() => navigate("/home")}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>

        <h1 className="text-xl font-bold">
          Create Job
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>


      {/* Form Section */}
      <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
            <option value="Part-time">Part-time</option>
          </select>

          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="3"
            required
          />

          <textarea
            name="requirements"
            placeholder="Requirements"
            value={form.requirements}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="3"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Create Job
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateJob;