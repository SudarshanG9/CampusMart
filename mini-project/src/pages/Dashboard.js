import React from 'react';

const DashboardPage = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Or use navigate
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Store Owner Dashboard</h1>
            <p>Welcome! Here you can manage your store's items.</p>
            {/* We will add forms to add/edit items here */}
            <button onClick={handleLogout} style={{ padding: '10px', backgroundColor: 'red', color: 'white', border: 'none' }}>Logout</button>
        </div>
    );
};

export default DashboardPage;