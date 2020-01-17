module.exports = function(app) {

    var branchs = require('../controllers/branches.controller.js');

    // Create a new Branch
    app.post('/api/branches', branchs.create);

    // Retrieve all Branch
    app.get('/api/branches', branchs.findAll);

    // Retrieve a single Branch by Id
    app.get('/api/branches/:branchId', branchs.findOne);

    // Update a Branch with Id
    app.put('/api/branches/:branchId', branchs.update);

    // Delete a Branch with Id
    app.delete('/api/branches/:branchId', branchs.delete);
}