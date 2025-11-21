const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', // <-- CHANGE THIS FROM 'User'
        required: true 
    },
    // A reference to the item that was reserved.
    item: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Item', // This links to the 'Item' collection
        required: true 
    },
    quantityReserved: { 
        type: Number, 
        required: true 
    },
    // This is the most important field. It stores the exact date and time of expiration.
    expiresAt: { 
        type: Date, 
        required: true 
    },
    // The status helps us easily find active or expired reservations.
    status: { 
        type: String, 
        enum: ['ACTIVE', 'EXPIRED', 'COMPLETED'], // Only these values are allowed
        default: 'ACTIVE' 
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;