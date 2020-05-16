module.exports = function(app) {

    var fliter = require('../controllers/fliters.controller.js');

    // Create a new Fliter
    app.post('/api/fliter', fliter.create);

    // Retrieve all Fliter
    app.get('/api/fliter', fliter.findAll);

    // Retrieve a single Fliter by Id
    app.get('/api/fliter/:fliterId', fliter.findOne);

    // Retrieve a single Fliter by name
    // app.get('/api/fliter/name/:name', fliter.findByName);

    // Update a Fliter with Id
    app.put('/api/fliter/:fliterId', fliter.update);

    // Delete a Fliter with Id
    app.delete('/api/fliter/:fliterId', fliter.delete);
}