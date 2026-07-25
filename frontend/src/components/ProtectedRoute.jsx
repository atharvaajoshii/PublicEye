import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/atharva.css"


export default function ProtectedRoute({children, roles}){
    const {user,loading} = useAuth()
    if(loading) return <h2 className="officer-loading">Loading...</h2>
    if(!user) return <Navigate to={"/login"} replace />
    if (roles && !roles.includes(user.role))
        return <Navigate to="/login" replace />;
    return children;
}