import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// --- THIS IS A NAMED EXPORT ---
// It allows other files to import it specifically by its name using curly braces.
export const useCart = () => {
    return useContext(CartContext);
};

// --- THIS IS ALSO A NAMED EXPORT ---
export const CartProvider = ({ children }) => {
    const [reservations, setReservations] = useState([]);
    const { isAuthenticated } = useAuth();

    // This function fetches the user's cart from the database.
    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        if (!isAuthenticated || !token) {
            setReservations([]); // Clear reservations if not authenticated
            return;
        }

        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get('http://localhost:5001/api/reservations/my-reservations', config);
            setReservations(data);
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            setReservations([]); // Clear reservations on error
        }
    };

    // This effect runs when the user's authentication status changes.
    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            // If the user logs out, clear the cart from the UI.
            setReservations([]);
        }
    }, [isAuthenticated]);

    // This function cancels a reservation.
    const cancelReservation = async (reservationId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`http://localhost:5001/api/reservations/${reservationId}`, config);
            await fetchCart(); // Re-fetch the cart to show the updated list.
        } catch (error) {
            console.error("Failed to cancel reservation:", error);
        }
    };

    // The value provided to all child components.
    const value = {
        reservations,
        fetchCart,
        cancelReservation,
        cartCount: reservations.length
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};