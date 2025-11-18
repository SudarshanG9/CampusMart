import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './StorePage.css';

const StorePage = () => {
    const { storeId } = useParams(); // This 'storeId' is the MongoDB _id from the URL
    const [store, setStore] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // This effect runs whenever the storeId in the URL changes
    useEffect(() => {
        if (storeId) {
            setLoading(true);
            // Fetch the items for this specific store from the backend API
            axios.get(`http://localhost:5001/api/stores/${storeId}`)
                .then(response => {
                    setStore(response.data.store);
                    setItems(response.data.items);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching store items!', error);
                    setLoading(false);
                });
        }
    }, [storeId]);

    // Display a loading message while the data is being fetched
    if (loading) {
        return <h2 style={{ color: 'white', textAlign: 'center', paddingTop: '5rem' }}>Loading Items...</h2>;
    }

    return (
        <div className="store-page-container">
            <Link to="/dashboard" className="back-link">&larr; Back to Stores</Link>
            <h1 className="store-header">{store ? store.name : 'Store'} Inventory</h1>
            <div className="items-grid">
                {items.length > 0 ? (
                    // We now map over the 'items' state variable, which holds live data
                    items.map((item) => (
                        <div key={item._id} className="item-card">
                            <img 
                                className="item-image"
                                src={item.imageUrl} 
                                alt={item.name} 
                            />
                            <div className="item-content">
                                <h3>{item.name}</h3>
                                <p className="item-price">₹{item.price ? item.price.toFixed(2) : 'N/A'}</p>
                                <p className="item-quantity">Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-items-message">This store has no items listed yet.</p>
                )}
            </div>
        </div>
    );
};

export default StorePage;