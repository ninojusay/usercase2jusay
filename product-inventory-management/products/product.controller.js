// products/product.controller.js
const Product = require('./product.model');

// View all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ where: { status: 'active' } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View product details
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        if (product) {
            await product.update(req.body);
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// In product.controller.js
const deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const result = await Product.destroy({ where: { id: productId } });
        if (result) {
            return res.status(204).send(); // No Content
        }
        return res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting product', error });
    }
};

// In your routes file
app.delete('/api/products/:productId', deleteProduct);
