import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // We use this to make the API call
import './StudentDashboardPage.css';

const StudentDashboardPage = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    // This state will hold the list of stores fetched from the database
    const [stores, setStores] = useState([]);

    // This useEffect hook runs once when the component first loads
    useEffect(() => {
        // Fetch the list of all stores from your backend API
        axios.get('http://localhost:5001/api/stores')
            .then(response => {
                // When the data arrives, save it into our 'stores' state
                setStores(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the stores!", error);
            });
    }, []); 

    return (
        <div className="dashboard-page-wrapper">
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1>Campus Stores</h1>
                    <button onClick={auth.logout} className="logout-button">Logout</button>
                </header>
                <div className="stores-grid">
                   
                    {stores.map((store) => (
                        <div
                            key={store._id} // Use the unique _id from MongoDB
                            onClick={() => navigate(`/store/${store._id}`)} // Pass the unique _id in the URL
                            className="store-card"
                        >
                            <h2>{store.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboardPage;