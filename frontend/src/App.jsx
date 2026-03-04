import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateJob from "./pages/CreateJob";
import MyJobs from "./pages/MyJobs";

const App = () => {
  return (
    <Routes>
      {/* Making Public */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* These are private routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-job"
        element={
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-jobs"
        element={
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
