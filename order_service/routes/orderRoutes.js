const express = require('express');
const { Order, Catalog } = require('../models/Order');
const {publishEvents} = require("../events/orderEvents")
const {authenticateUser} = require("../middleware/authenticate")

const router = express.Router();

// Create an order
router.post('/', authenticateUser, async (req, res) => {
    const { productid, quantity } = req.body;
    
    try {
        if (!productid || !quantity ) {
            return res.status(400).json({ error: 'Invalid input' });
        }
        const product =  await Catalog.findOne({ where: { productid: productid} })

        const totalprice = product.price * quantity;

        const order = await Order.create({
            userid: req.user.id,
            productid: productid,
            quantity: quantity,
            totalprice: totalprice,
        });

        await publishEvents("order-placed", order);

        return res.status(201).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create order' });
    }
});

// get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll();
        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve orders' });
    }
});

// get order by id
router.get('/:id', async (req, res) => {
    const orderid = req.params.id;

    try {
        const order = await Order.findByPk(orderid);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve order' });
    }
});

module.exports = router;