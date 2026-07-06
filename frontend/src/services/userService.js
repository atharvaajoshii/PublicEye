 import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

 const getProfile = async () => {
    const user = await axios.get(`${API_URL}/profile`,{
        withCredentials:true
    });
    return user.data ;
 }

 export default{
    getProfile
 };