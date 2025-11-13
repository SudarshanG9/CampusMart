// src/pages/StudentDashboardPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fakeStores } from '../data/mockData';

const StudentDashboardPage = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <h1 style={{ margin: 0 }}>Campus Stores</h1>
                <button onClick={auth.logout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
            <div style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {fakeStores.map((store) => (
                    <div
                        key={store.id}
                        onClick={() => navigate(`/store/${store.id}`)}
                        style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}
                    >
                        <h2>{store.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

// THIS LINE IS CRUCIAL
export default StudentDashboardPage;