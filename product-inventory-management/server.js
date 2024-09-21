// server.js
const express = require('express');
const sequelize = require('./db');
const productRoutes = require('./products/product.controller');

const app = express();
app.use(express.json());

// Define routes
app.post('/api/products', productRoutes.createProduct);
app.get('/api/products', productRoutes.getAllProducts);
// Add other routes as needed

// Sync database and start server
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000');
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });
