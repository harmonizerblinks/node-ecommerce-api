module.exports = function(app) {

    var fliter = require('../controllers/fliters.controller.js');

    // Create a new Fliter
    app.post('/api/fliters', fliter.create);

    // Retrieve all Fliter
    app.get('/api/fliters', fliter.findAll);

    // Retrieve a single Fliter by Id
    app.get('/api/fliters/:fliterId', fliter.findOne);

    // Retrieve a single Fliter by name
    // app.get('/api/fliter/name/:name', fliter.findByName);

    // Update a Fliter with Id
    app.put('/api/fliters/:fliterId', fliter.update);

    // Delete a Fliter with Id
    app.delete('/api/fliters/:fliterId', fliter.delete);
}