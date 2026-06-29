import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReportIssue from "./pages/ReportIssue";
import IssueDetails from "./pages/IssueDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import OfficerDashboard from "./pages/OfficerDashboard";
import Analytics from "./pages/Analytics";
import ManageIssues from "./pages/ManageIssues";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import IssueManagement from "./pages/admin/IssueManagement";
import UserManagement from "./pages/admin/UserManagement";
import OfficerManagement from "./pages/admin/OfficerManagement";
import Reports from "./pages/admin/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/issue/:id" element={<IssueDetails />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/report" element={<ProtectedRoute><ReportIssue /></ProtectedRoute>}/>
        <Route path="/officer/dashboard" element={<OfficerDashboard />} />
        <Route path="/officer/analytics" element={<Analytics />} />
        <Route path="/officer/manage-issues" element={<ManageIssues />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/manage-issues" element={<IssueManagement />} />
        <Route path="/admin/manage-users" element={<UserManagement />} />
        <Route path="/admin/manage-officers" element={<OfficerManagement />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
