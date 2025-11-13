// src/pages/StudentLoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StudentLoginPage = () => {
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

    return (
        // ... JSX for the form is here ...
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '400px', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2 style={{ textAlign: 'center' }}>Student Login</h2>
                <form onSubmit={handleLogin}>
                    {/* inputs and button */}
                    <div style={{ marginBottom: '1rem' }}>
                        <label>SRN (College ID)</label>
                        <input type="text" value={srn} onChange={(e) => setSrn(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" style={{ width: '100%', padding: '10px' }}>Login</button>
                </form>
            </div>
        </div>
    );
};

// Make sure this line exists and is correct
export default StudentLoginPage;