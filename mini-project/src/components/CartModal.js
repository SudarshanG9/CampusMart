import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

// This component handles the logic for a single item in the cart
const ReservationItem = ({ reservation }) => {
    const { cancelReservation } = useCart(); // Get the cancel function from our context
    const [timeLeft, setTimeLeft] = useState('...');

    // This useEffect hook creates and manages the live countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const expiry = new Date(reservation.expiresAt);
            const difference = expiry - now;

            if (difference <= 0) {
                setTimeLeft('Expired');
                clearInterval(timer);
                // Optional: You could automatically refresh the cart here after a delay
            } else {
                const minutes = Math.floor((difference / 1000) / 60);
                const seconds = Math.floor((difference / 1000) % 60);
                // Pad with a '0' if the number is less than 10 for a nice "05:09" format
                setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }
        }, 1000);

        // This is a crucial cleanup function. It stops the timer when the item is removed from the cart.
        return () => clearInterval(timer);
    }, [reservation.expiresAt]);

    // This is the JSX that matches our new CSS layout
    return (
        <div className="reservation-item">
            <img src={reservation.item.imageUrl} alt={reservation.item.name} />
            <div className="item-details">
                <h4>{reservation.item.name}</h4>
                <p>Quantity: {reservation.quantityReserved}</p>
            </div>
            <div className="item-timer">{timeLeft}</div>
            {/* The button now correctly calls the cancelReservation function */}
            <button className="btn-cancel-item" onClick={() => cancelReservation(reservation._id)}>
                Delete
            </button>
        </div>
    );
};


// This is the main Cart Modal component
const CartModal = ({ isOpen, onClose }) => {
    const { reservations, cartCount } = useCart();

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content cart-content" onClick={(e) => e.stopPropagation()}>
                <h3>Your Reservations ({cartCount})</h3>
                <div className="reservations-list">
                    {reservations.length > 0 ? (
                        reservations.map(res => <ReservationItem key={res._id} reservation={res} />)
                    ) : (
                        <p className="empty-cart-message">Your cart is empty.</p>
                    )}
                </div>
                <div className="modal-actions">
                    <button className="btn-close-cart" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;