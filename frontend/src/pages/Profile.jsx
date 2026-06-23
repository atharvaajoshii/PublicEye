//aak
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function Profile() {
  const navigate = useNavigate();

  const logout = async (e) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/logout")
      alert("logged out!!")
      navigate('/login')
    } catch (error) {

    }
  }
  return (
    <>
      <h1>Profile</h1>
      <button onClick={logout}>logout</button>
    </>
  )

}