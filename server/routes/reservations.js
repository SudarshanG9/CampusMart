const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation.model');
const Item = require('../models/item.model');
const { protect } = require('../middleware/authMiddleware'); // This will now import the correct function

router.post('/', protect, async (req, res) => {
    const { itemId, quantity } = req.body;
    const studentId = req.user.id;
    try {
        const item = await Item.findById(itemId);
        if (!item || item.quantity < quantity) {
            return res.status(400).json({ message: "Item not available in the requested quantity." });
        }
        item.quantity -= quantity;
        await item.save();
        const newReservation = new Reservation({
            student: studentId, item: itemId, quantityReserved: quantity,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) { res.status(500).json({ message: "Server error", error }); }
});

router.get('/my-reservations', protect, async (req, res) => {
    try {
        const reservations = await Reservation.find({ student: req.user.id, status: 'ACTIVE' }).populate('item');
        res.json(reservations);
    } catch (error) { res.status(500).json({ message: "Server error", error }); }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation || reservation.student.toString() !== req.user.id) {
            return res.status(404).json({ message: "Reservation not found or not authorized." });
        }
        const item = await Item.findById(reservation.item);
        if (item) {
            item.quantity += reservation.quantityReserved;
            await item.save();
        }
        await reservation.deleteOne();
        res.json({ message: "Reservation canceled." });
    } catch (error) { res.status(500).json({ message: "Server error", error }); }
});

module.exports = router;