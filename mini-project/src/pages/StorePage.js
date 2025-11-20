import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './StorePage.css';
// This import path must be correct
import ReservationModal from '../components/ReservationModal'; 

const StorePage = () => {
    const { storeId } = useParams();
    const [store, setStore] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    
    // --- We also need to create the `fetchItems` function ---
    // This avoids code duplication.
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

    const openReservationModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeReservationModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleConfirmReservation = async (itemId, quantity, time) => { // Make the function async
        try {
            // 1. Get the authentication token from local storage.
            //    The user must be logged in to make a reservation.
            const token = localStorage.getItem('token');
            if (!token) {
                alert("You must be logged in to reserve items.");
                return;
            }
    
            // 2. Set up the authorization headers for the API request.
            //    This tells the backend who is making the reservation.
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            // 3. Make the API call to the backend endpoint we created.
            //    We send the itemId and the quantity the user selected.
            //    (Note: The 'time' variable isn't needed by the backend, as the backend
            //    always creates a 10-minute reservation by default for now).
            await axios.post(
                'http://localhost:5001/api/reservations', 
                { itemId, quantity }, 
                config
            );
            
            alert("Item reserved successfully!");
            
            // 4. (Important UX Improvement)
            //    After a successful reservation, the item quantity has changed in the database.
            //    We need to re-fetch the data to show the updated quantity.
            //    We can do this by creating a simple function.
            fetchItems(); 
    
        } catch (error) {
            // Display a helpful error message if the backend rejects the request
            console.error("Reservation failed:", error);
            alert("Failed to reserve item. " + (error.response?.data?.message || "There was a server error."));
        } finally {
            // 5. Always close the modal, whether it succeeded or failed.
            closeReservationModal();
        }
    };
    

  
    
    if (loading) {
        return <h2 style={{ color: 'white', textAlign: 'center', paddingTop: '5rem' }}>Loading Items...</h2>;
    }

    return (
        <div className="store-page-container">
            <Link to="/dashboard" className="back-link">&larr; Back to Stores</Link>
            <h1 className="store-header">{store ? store.name : 'Store'} Inventory</h1>
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
            
            <ReservationModal 
                isOpen={isModalOpen}
                onClose={closeReservationModal}
                onConfirm={handleConfirmReservation}
                item={selectedItem}
            />
        </div>
    );
};

export default StorePage;