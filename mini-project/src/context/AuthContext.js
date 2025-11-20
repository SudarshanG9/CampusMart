import React, { createContext, useState, useContext } from 'react';
import axios from 'axios'; // 1. We need axios now

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // We check for the SRN to decide if the user is "authenticated" in the UI
    const [user, setUser] = useState(() => localStorage.getItem('userSRN'));

    // 2. This function must now be ASYNC to talk to the server
    const login = async (srn, password) => {
        try {
            // 3. Make the real API call to the backend
            const response = await axios.post('http://localhost:5001/api/auth/login', { srn, password });
            
            if (response.data.token) {
                // 4. CRITICAL: Save the TOKEN to local storage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userSRN', srn); 
                
                setUser(srn);
                return true; // Login successful
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed: " + (error.response?.data || "Invalid credentials"));
            return false; // Login failed
        }
    };

    const logout = () => {
        // 5. Clear everything on logout
        localStorage.removeItem('userSRN');
        localStorage.removeItem('token'); 
        setUser(null);
        window.location.href = '/';
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};