import React, { useState, useEffect } from 'react';
import './ReservationModal.css';

const ReservationModal = ({ item, isOpen, onClose, onConfirm }) => {
    const [quantity, setQuantity] = useState(1);
    const [time, setTime] = useState(5);

    useEffect(() => {
        if (item) {
            setQuantity(1);
        }
    }, [item]);

    // --- THIS IS THE FIX ---
    // If the modal isn't open OR if there's no item selected yet, render nothing.
    // This prevents the 'cannot read properties of null' crash.
    if (!isOpen || !item) {
        return null;
    }

    const handleConfirm = () => {
        onConfirm(item._id, quantity, time);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Reserve Item</h3>
                <h4>{item.name}</h4>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity (Max: 5)</label>
                    <input
                        id="quantity"
                        type="number"
                        className="quantity-input-modal" // Changed class name to avoid conflicts
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(5, Number(e.target.value))))}
                        min="1"
                        max="5"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Reserve for (minutes)</label>
                    <select
                        id="time"
                        className="time-select"
                        value={time}
                        onChange={(e) => setTime(Number(e.target.value))}
                    >
                        <option value="5">5 minutes</option>
                        <option value="8">8 minutes</option>
                        <option value="10">10 minutes</option>
                    </select>
                </div>

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-confirm" onClick={handleConfirm}>Confirm Reservation</button>
                </div>
            </div>
        </div>
    );
};

export default ReservationModal;