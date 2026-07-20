import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReportIssue from "./pages/ReportIssue";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import OfficerDashboard from "./pages/OfficerDashboard";
import Analytics from "./pages/Analytics";
import ManageIssues from "./pages/ManageIssues";
import AdminDashboard from "./pages/admin/AdminDashboard";
import IssueManagement from "./pages/admin/IssueManagement";
import UserManagement from "./pages/admin/UserManagement";
import OfficerManagement from "./pages/admin/OfficerManagement";
import Reports from "./pages/admin/Reports";
import Dashboard from "./pages/Dashboard";
import AllIssues from "./pages/AllIssues";
import OfficerReport from "./pages/OfficerReport";
import ManageIssues_user from "./pages/ManageIssues_user";
import MyReports from "./pages/MyReports";
import Layout from "./components/Layout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/allissues"
            element={
              <ProtectedRoute>
                <AllIssues />
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
            path="/report"
            element={
              <ProtectedRoute>
                <ReportIssue />
              </ProtectedRoute>
            }
          />

          <Route
            path="/officer/dashboard"
            element={
              <ProtectedRoute roles={["officer"]}>
                <OfficerDashboard />
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
            path="/officer/manage-issues"
            element={
              <ProtectedRoute roles={["officer"]}>
                <ManageIssues />
              </ProtectedRoute>
            }
          />

          <Route
            path="/issue/:issueId/report"
            element={
              <ProtectedRoute roles={["officer"]}>
                <OfficerReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/manage-issues"
            element={
              <ProtectedRoute roles={["admin"]}>
                <IssueManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/manage-users"
            element={
              <ProtectedRoute roles={["admin"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/manage-officers"
            element={
              <ProtectedRoute roles={["admin"]}>
                <OfficerManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manage-issues"
            element={
              <ProtectedRoute>
                <ManageIssues_user />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myreports"
            element={
              <ProtectedRoute>
                <MyReports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/all-issues"
            element={
              <ProtectedRoute>
                <AllIssues />
              </ProtectedRoute>
            }
          />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;