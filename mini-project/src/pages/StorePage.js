import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { fakeStores, fakeItems } from '../data/mockData';
import './StorePage.css'; // <-- 1. IMPORT YOUR NEW CSS FILE

const StorePage = () => {
    const { storeId } = useParams();
    const store = fakeStores.find(s => s.id === storeId);
    const items = fakeItems[storeId] || [];

    // 2. APPLY THE NEW CSS CLASSES TO YOUR JSX
    return (
        <div className="store-page-container">
            <Link to="/dashboard" className="back-link">&larr; Back to Stores</Link>
            <h1 className="store-header">{store ? store.name : 'Store'} Inventory</h1>
            
            <div className="items-grid">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="item-card">
                            <img 
                                className="item-image"
                                // Using a placeholder service for images. We replace spaces with '+' for the URL.
                                src={`https://via.placeholder.com/300x200?text=${item.name.replace(' ', '+')}`} 
                                alt={item.name} 
                            />
                            <div className="item-content">
                                <h3>{item.name}</h3>
                                <p className="item-price">₹{item.price.toFixed(2)}</p>
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