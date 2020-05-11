const Category = require('../models/blog_category.model.js');


// POST a Category
exports.create = (req, res) => {
    // console.log(req.body);
    // Create a Category
    const category = new Category(req.body);

    // Save a Category in the MongoDB
    category.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FETCH all Categorys
exports.findAll = (req, res) => {
    console.log('fine All');
    Category.find()
        .then(categorys => {
            // console.log(categorys)
            res.send(categorys);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FIND a Category
exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Category with id " + req.params.categoryId
            });
        });
};

// FIND a Category
exports.findByName = (req, res) => {
    console.log('fine By Name');
    let query = { name: req.params.name };
    Category.findOne(query)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with Name " + req.params.name
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with name " + req.params.name
                });
            }
            return res.status(500).send({
                message: "Error retrieving Category with name " + req.params.name
            });
        });
};

// UPDATE a Category
exports.update = (req, res) => {
    var body = req.body;
    // console.log(body)
    body.updated = new Date();
    // Find category and update it
    Category.findByIdAndUpdate(req.params.categoryId, body, { new: true })
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Error updating category with id " + req.params.categoryId
            });
        });
};

// DELETE a Category
exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            res.send({ message: "Category deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Could not delete category with id " + req.params.categoryId
            });
        });
};