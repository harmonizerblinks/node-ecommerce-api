module.exports = function(app) {

    var products = require('../controllers/products.controller.js');

    // Create a new Product
    app.post('/api/products', products.create);

    // Upload Product
    app.post('/api/products/upload', products.upload);

    // Batch Update Product
    app.put('/api/products/upload', products.uploadUpdate);

    // Retrieve all Product
    app.get('/api/products', products.findAll);

    // Retrieve all by CategoryId
    app.get('/api/products/category/:categoryId', products.findAllByCategory);

    // Retrieve a single Product by Id
    app.get('/api/products/:productId', products.findOne);

    // Update a Product with Id
    app.put('/api/products/:productId', products.update);

    // Delete a Product with Id
    app.delete('/api/products/:productId', products.delete);
}