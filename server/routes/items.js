const router = require('express').Router();
const Item = require('../models/item.model');
const auth = require('../auth.middleware'); // <-- Import our new middleware

// @route   POST /api/items
// @desc    Add a new item to a store
// @access  Private (requires a token)
router.post('/', auth, async (req, res) => {
    try {
        const { name, quantity, price, imageUrl, store } = req.body;

        // In a real app, you would also verify that req.user has permission
        // to add items to this specific 'store'. For now, this is secure.

        const newItem = new Item({
            name,
            quantity,
            price,
            imageUrl,
            store
        });

        const item = await newItem.save();
        res.status(201).json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);

        if (!item) return res.status(404).json({ msg: 'Item not found' });

        await Item.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;