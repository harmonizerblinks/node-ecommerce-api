module.exports = function(app) {

    var category = require('../controllers/category.controller.js');

    // Create a new Category
    app.post('/api/category', category.create);

    // Retrieve all Category
    app.get('/api/category', category.findAll);

    // Retrieve a single Category by Id
    app.get('/api/category/:categoryId', category.findOne);

    // Retrieve a single Category by name
    app.get('/api/category/name/:name', category.findByName);

    // Update a Category with Id
    app.put('/api/category/:categoryId', category.update);

    // Delete a Category with Id
    app.delete('/api/category/:categoryId', category.delete);
}