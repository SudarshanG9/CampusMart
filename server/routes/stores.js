
const express = require('express');
const router = express.Router();


const Store = require('../models/store.model');
const Item = require('../models/item.model');

// GET /api/stores -> Fetches ALL stores
router.get('/', async (req, res) => {
    console.log('Request received at /api/stores endpoint');
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET /api/stores/:id -> Fetches a SINGLE store and all of its items
router.get('/:id', async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        const items = await Item.find({ store: req.params.id });
        res.json({ store, items });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;