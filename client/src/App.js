import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

// pages

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Profile from "./pages/Profile";

import Inventory from "./pages/Inventory";

import Donors from "./pages/Donors";

import Hospitals from "./pages/Hospitals";

import Requests from "./pages/Requests";

import Analytics from "./pages/Analytics";

import Availability from "./pages/Availability";

import ForgotPassword from "./pages/ForgotPassword";

import VerifyOTP from "./pages/VerifyOTP";

import ResetPassword from "./pages/ResetPassword";
// protected route

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <>

      {/* toaster */}

      <Toaster position="top-right" />

      <Routes>

        {/* protected routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donors"
          element={
            <ProtectedRoute>
              <Donors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hospitals"
          element={
            <ProtectedRoute>
              <Hospitals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/availability"
          element={
            <ProtectedRoute>
              <Availability />
            </ProtectedRoute>
          }
        />

        {/* public routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        {/* 404 route */}

        <Route
          path="*"
          element={<Navigate to="/" />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

      </Routes>

    </>

  );
}

export default App;