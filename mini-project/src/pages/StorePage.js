import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './StorePage.css';

// Your component imports are perfect
import ReservationModal from '../components/ReservationModal'; 
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import CartModal from '../components/CartModal';


const StorePage = () => {
    // --- STATE DECLARATIONS (FIXED) ---
    // We get the fetchCart function from our new context
    const { fetchCart } = useCart(); 
    // State for the CART modal
    const [isCartOpen, setIsCartOpen] = useState(false); 
    // State for the RESERVATION modal
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
    
    // Your existing state is perfect
    const { storeId } = useParams();
    const [store, setStore] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    
    // --- DATA FETCHING (UNCHANGED) ---
    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5001/api/stores/${storeId}`);
            setStore(response.data.store);
            setItems(response.data.items);
        } catch (error) {
            console.error('Error fetching store items!', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (storeId) {
            fetchItems();
        }
    }, [storeId]);


    // --- MODAL CONTROL FUNCTIONS (UPDATED) ---
    const openReservationModal = (item) => {
        setSelectedItem(item);
        setIsReservationModalOpen(true);
    };

    const closeReservationModal = () => {
        setIsReservationModalOpen(false);
        setSelectedItem(null);
    };

    const handleConfirmReservation = async (itemId, quantity, time) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("You must be logged in to reserve items.");
                return;
            }
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post('http://localhost:5001/api/reservations', { itemId, quantity }, config);
            
            alert("Item reserved successfully!");
            
            // This part is perfect - it updates both the page and the cart
            fetchItems(); 
            fetchCart(); 
    
        } catch (error) {
            console.error("Reservation failed:", error);
            alert("Failed to reserve item. " + (error.response?.data?.message || "There was a server error."));
        } finally {
            closeReservationModal();
        }
    };
    
    if (loading) {
        return <h2 style={{ color: 'white', textAlign: 'center', paddingTop: '5rem' }}>Loading Items...</h2>;
    }

    // --- RENDER METHOD (UPDATED JSX) ---
    return (
        <div className="store-page-container">
            {/* 1. We now use the Header component for the title and cart icon */}
            <Header title={store ? store.name : 'Store Inventory'} onCartClick={() => setIsCartOpen(true)} />

            {/*<h1 className="store-header">{store ? store.name : 'Store'} Inventory</h1>*/}


            <Link to="/dashboard" className="back-link">&larr; Back to All Stores</Link>
            
            <div className="items-grid">
                {items.length > 0 ? (
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
                                <p className="item-quantity">In Stock: {item.quantity}</p>
                                <button 
                                    className="reserve-button" 
                                    onClick={() => openReservationModal(item)}
                                    disabled={item.quantity === 0}
                                >
                                    Reserve
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-items-message">This store has no items listed yet.</p>
                )}
            </div>
            
            {/* 2. We render BOTH modals. They are invisible until their state is true. */}
            <ReservationModal 
                isOpen={isReservationModalOpen}
                onClose={closeReservationModal}
                onConfirm={handleConfirmReservation}
                item={selectedItem}
            />
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    );
};

export default StorePage;