const express = require('express');
const { Product } = require("../models/Product")
const { publishEvents } = require('../events/productEvents');
const {authenticateRole} = require("../middleware/authenticate")

const router = express.Router();

//create a product
// authenticated user can create a product
router.post('/', authenticateRole("ADMIN"), async (req, res) => {
  const { name, price, inventory } = req.body;

  try {
    const newProduct = await Product.create({ name, price, inventory });

    await publishEvents("product-created", newProduct);
    
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to create a product" });
  }
});

//update a product
router.put('/:id', authenticateRole("ADMIN"), async (req, res) => {
  const { name, price, inventory } = req.body;

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const updatedProduct = await product.update({ name, price, inventory });

    await publishEvents("inventory-updated", updatedProduct);
    
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// get all the products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// get a product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to the specific order" });
  }
});

module.exports = router;
