const Product = require('../models/products.model.js');


// POST a Product
exports.create = (req, res) => {
    // Create a Product
    const product = new Product(req.body);

    product.rout = null;
    var code = product.name.toLowerCase();
    product.rout = code.replace(/\s+/g, '-') + '-' + product.code.toLowerCase();

    // Save a Product in the MongoDB
    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// POST a Upload
exports.upload = async(req, res) => {
    // Get Uploaded Product
    const products = req.body;
    // req.send(products);
    // Save Products in the MongoDB
    Product.updateMany(products)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.uploadUpdate = async(req, res) => {
    // Get Uploaded Product
    const products = req.body;
    // req.send(products);
    // Save Products in the MongoDB
    const start = async() => {
        const prods = [];
        await asyncForEach(products, async(p) => {
            const product = await Product.findByIdAndUpdate(p._id, {
                original_amount: p.original_amount,
                current_amount: p.current_amount,
                sizes: p.sizes,
                colors: p.colors
            }, { new: true });
            prods.push(p);
            console.log('updated');
        });
        console.log('Done');
        res.send(prods);
    }
    start();
    res.send(products);
    // Product.updateMany(products)
    //     .then(data => {
    //         res.send(data);
    //     }).catch(err => {
    //         res.status(500).send({
    //             message: err.message
    //         });
    //     });
};


// FETCH all Products
exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// FETCH all Products by CategoryId
exports.findAllByCategory = (req, res) => {
    let query = { categoryid: req.params.categoryId };
    Product.find(query)
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FIND a Product
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Product with id " + req.params.productId
            });
        });
};

// UPDATE a Product
exports.update = (req, res) => {
    var body = req.body;
    console.log(body)
    body.updated = new Date();
    if (!body.rout) {
        var code = body.name.toLowerCase();
        body.rout = code.replace(/\s+/g, '-') + '-' + body.code.toLowerCase();
    }
    // Find product and update it
    Product.findByIdAndUpdate(req.params.productId, body, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Error updating product with id " + req.params.productId
            });
        });
};

// DELETE a Product
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send({ message: "Product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.productId
            });
        });
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}