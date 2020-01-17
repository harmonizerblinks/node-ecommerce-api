module.exports = function(app) {

    var blogs = require('../controllers/blogs.controller.js');

    // Create a new Blog
    app.post('/api/blogs', blogs.create);

    // Retrieve all Blog
    app.get('/api/blogs', blogs.findAll);

    // Retrieve a single Blog by Id
    app.get('/api/blogs/:blogsId', blogs.findOne);

    // Update a Blog with Id
    app.put('/api/blogs/:blogsId', blogs.update);

    // Delete a Blog with Id
    app.delete('/api/blogs/:blogsId', blogs.delete);
}