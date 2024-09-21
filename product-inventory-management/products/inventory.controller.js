// products/inventory.controller.js
const Product = require('./product.model');

// View inventory
exports.getInventory = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update inventory (e.g., adding stock)
exports.updateInventory = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findByPk(productId);
        if (product) {
            // Assuming you just want to increase stock for simplicity
            // You might want to implement actual stock management
            product.quantity += quantity;
            await product.save();
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
