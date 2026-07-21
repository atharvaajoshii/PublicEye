import authService from "../services/authService";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const login = async (credentials) => {
        const res = await authService.login(credentials)
        setUser(res.user)
        return res;
    }
    const register = async (credentials) => {
        return await authService.register(credentials)
    }
    const logout = async () => {
        await authService.logout()
        setUser(null)
    }
    const checkAuth = async () => {
        try {
            const res = await authService.getCurrentUser();
            setUser(res.user)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=>{
        checkAuth()
    },[])
    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
};