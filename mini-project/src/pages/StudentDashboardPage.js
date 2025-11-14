import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fakeStores } from '../data/mockData';
import './StudentDashboardPage.css'; // This line is correct and imports your styles

const StudentDashboardPage = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    // This is the only part that needs to change.
    // We are replacing all `style={{...}}` with `className="..."`
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Campus Stores</h1>
                <button onClick={auth.logout} className="logout-button">
                    Logout
                </button>
            </header>

            <div className="stores-grid">
                {fakeStores.map((store) => (
                    <div
                        key={store.id}
                        onClick={() => navigate(`/store/${store.id}`)}
                        className="store-card" // This now applies your 3D neon styles
                    >
                        <h2>{store.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentDashboardPage;