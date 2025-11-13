import React, { createContext, useState, useContext } from 'react';
import { fakeStudents } from '../data/mockData';

// The default value is null, which causes the error if the Provider is missing.
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => localStorage.getItem('userSRN'));

    const login = (srn, password) => {
        const student = fakeStudents.find(s => s.srn === srn && s.password === password);
        if (student) {
            localStorage.setItem('userSRN', student.srn);
            setUser(student.srn);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('userSRN');
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