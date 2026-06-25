import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
// import ReportIssue from "./pages/ReportIssue";
// import IssueDetails from "./pages/IssueDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/issue/:id" element={<IssueDetails />} /> */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;