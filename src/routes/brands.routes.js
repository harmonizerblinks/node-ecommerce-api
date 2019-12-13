module.exports = function(app) {

    var brands = require('../controllers/brands.controller.js');
    const passport = require('passport');

    // Create a new Brand
    app.post('/api/brands', brands.create);

    // Retrieve all Brand
    app.get('/api/brands', brands.findAll);

    // Retrieve a single Brand by Id
    /**
     * @swagger
     * /api/brands/{brandId}:
     *  get:
     *    description: Use to request brand by Brand  Id
     *    responses:
     *      '200':
     *        description: A successful response
     */
    app.get('/api/brands/:brandId', brands.findOne);

    // Retrieve a single Brand by name
    app.get('/api/brands/name/:name', brands.findByName);

    // Update a Brand with Id
    app.put('/api/brands/:brandId', brands.update);

    // Delete a Brand with Id
    app.delete('/api/brands/:brandId', brands.delete);
}