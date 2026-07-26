// pages/ProfilePage.jsx
import { useAuth } from "../context/AuthContext";
import CitizenProfile from "./Profile";
import StaffProfile from "./OfficerProfile"; // shared: officer + admin

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) return <h2 className="officer-loading">Loading...</h2>;
  if (user?.role === "citizen") return <CitizenProfile />;
  return <StaffProfile />; // officer + admin
}