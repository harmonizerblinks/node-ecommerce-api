module.exports = function(app) {

    var users = require('../controllers/users.controller.js');
    const verify = require('../middleware/verifyJwtToken.middleware.js');
    const passport = require('passport');

    // Create a new User
    app.post('/api/users', verify.verifyToken, users.create);

    // User Login or Authentication
    app.post('/api/login', users.login);

    // Retrieve all User
    app.get('/api/users', users.findAll);

    // Retrieve Current Login User Prodile
    app.get('/api/profile', verify.verifyToken, users.profile);

    // Retrieve a single User by Id
    app.get('/api/users/:userId', verify.verifyToken, users.findOne);

    // Retrieve a single User by username
    app.get('/api/users/username/:username', users.findOneByUsername);

    // Update a User with Id
    app.put('/api/users/:userId', verify.verifyToken, users.update);

    // Delete a User with Id
    app.delete('/api/users/:userId', verify.verifyToken, users.delete);
}