module.exports = function(app) {

    var website = require('../controllers/website.controller.js');

    // Create a new Order
    // app.post('/api/website', website.getFeaturedCategory);

    // Retrieve all Categories and Products
    app.get('/api/website', website.getFeaturedCategory);

    // Retrieve all Blogs
    app.get('/api/website/blogs', website.findAllBlogs);

    // Retrieve all Categories
    app.get('/api/website/brands', website.findAllBrands);

    // Retrieve all Categories
    app.get('/api/website/category', website.findAllCategorys);

    // Retrieve all Categories
    app.get('/api/website/category/all', website.findAllCategoryProducts);

    // Retrieve all Products by CategoryId
    app.get('/api/website/category/:categoryId', website.findCategoryById);

    // Retrieve all Products by CategoryId
    app.get('/api/website/category/products/:categoryId', website.findAllProductsByCategory);

    // Retrieve all Products
    app.get('/api/website/products', website.findAllProducts);

    // Retrieve all Branches
    app.get('/api/website/branches', website.findAllBranch);

    // Retrieve a single Brand by name
    app.get('/api/website/brands/:name', website.findBrandByName);

    // Retrieve a single Brand by name
    app.get('/api/website/brands/:name/:categoryId', website.findBrandCategoryProducts);

    // Retrieve a single Website by Id
    app.get('/api/website/:productid', website.findOne);

}