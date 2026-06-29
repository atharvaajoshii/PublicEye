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
        <Route path="/officer/dashboard" element={<ProtectedRoute roles={["admin"]}><OfficerDashboard /></ProtectedRoute>} />
        <Route path="/officer/analytics" element={<ProtectedRoute roles={["admin"]}><Analytics /></ProtectedRoute>} />
        <Route path="/officer/manage-issues" element={<ProtectedRoute roles={["admin"]}><ManageIssues /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute roles={["admin"]}><AdminDashboard/></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute roles={["admin"]}><AdminAnalytics/></ProtectedRoute>} />
        <Route path="/admin/manage-issues" element={<ProtectedRoute roles={["admin"]}><IssueManagement/></ProtectedRoute>} />
        <Route path="/admin/manage-users" element={<ProtectedRoute roles={["admin"]}><UserManagement/></ProtectedRoute>} />
        <Route path="/admin/manage-officers" element={<ProtectedRoute roles={["admin"]}><OfficerManagement/></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute roles={["admin"]}><Reports/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
