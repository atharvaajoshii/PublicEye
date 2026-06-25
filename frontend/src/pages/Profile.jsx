//aak
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const handleLogout = async (e) => {
    try {
      logout();
      alert("logged out!!")
      navigate('/login')
    } catch (error) {

    }
  }
  return (
    <>
      <h1>Profile</h1>
      <button onClick={handleLogout}>logout</button>
    </>
  )

}