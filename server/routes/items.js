const router = require('express').Router();
const Item = require('../models/item.model');
// We will add protection later

// POST /api/items - Create a new item
router.post('/', async (req, res) => {
    try {
        const { name, quantity, imageUrl, store } = req.body;
        const newItem = new Item({ name, quantity, imageUrl, store });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// DELETE /api/items/:id - Delete an item
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json('Item deleted.');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// We can add PUT (update) later

module.exports = router;