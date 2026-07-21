 import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

 const getProfile = async () => {
    const user = await axios.get(`${API_URL}/profile`,{
        withCredentials:true
    });
    return user.data ;
 }
const updateProfile = async (data) => {
   const response = await axios.put(
      `${API_URL}/profile`,
      data,
      {withCredentials:true}
   );
   return response.data;
}
 export default{
    getProfile,
    updateProfile
 };