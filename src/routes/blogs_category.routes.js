module.exports = function(app) {

    var category = require('../controllers/blogs_category.controller.js');

    // Create a new Blog
    app.post('/api/blogs_category', category.create);

    // Retrieve all Blog
    app.get('/api/blogs_category', category.findAll);

    // Retrieve a single Blog by Id
    app.get('/api/blogs_category/:categoryId', category.findOne);

    // Update a Blog with Id
    app.put('/api/blogs_category/:categoryId', category.update);

    // Delete a Blog with Id
    app.delete('/api/blogs_category/:categoryId', category.delete);
}