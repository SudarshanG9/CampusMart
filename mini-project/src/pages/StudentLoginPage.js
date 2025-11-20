import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './StudentLoginPage.css';

const StudentLoginPage = () => {
    // --- All of your existing logic stays exactly the same ---
    const [srn, setSrn] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        const success = auth.login(srn, password);
        if (success) {
            navigate('/dashboard');
        } else {
            setError('Invalid SRN or Password. Please try again.');
        }
    };

    // --- The JSX is now updated to the new two-column structure ---
    return (
        <div className="login-page-container">
            {/* The Left Column (Your Form) */}
            <div className="login-column">
                <div className="login-form-wrapper">
                    <h2>Welcome Back</h2>
                    <p className="subtitle">Log in to view the campus inventory.</p>
                    
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="SRN (College ID)"
                                value={srn}
                                onChange={(e) => setSrn(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        {error && <p className="error-message">{error}</p>}
                        
                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>
                </div>
            </div>

            {/* The Right Column (Your Branding Canvas) */}
            <div className="branding-column">
                <div className="logo"></div> 
                <h1>Campus Inventory</h1>
                <p>PES University</p>
            </div>
        </div>
    );
};

export default StudentLoginPage;