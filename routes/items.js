const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Create
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', getItem, (req, res) => {
    res.json(res.item);
});

// Update
router.patch('/:id', getItem, async (req, res) => {
    if (req.body.name != null) {
        res.item.name = req.body.name;
    }
    if (req.body.quantity != null) {
        res.item.quantity = req.body.quantity;
    }
    if (req.body.price != null) {
        res.item.price = req.body.price;
    }

    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete
router.delete('/:id', getItem, async (req, res) => {
    try {
        await res.item.remove();
        res.json({ message: 'Deleted Item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getItem(req, res, next) {
    let item;
    try {
        item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.item = item;
    next();
}

module.exports = router;
