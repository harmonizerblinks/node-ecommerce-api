const mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;

const Category = require('../models/category.model.js');
const Brands = require('../models/brands.model.js');;
const Product = require('../models/products.model.js');
const Customer = require('../models/customer.model.js');
const Brand = require('../models/brands.model.js');
const Blog = require('../models/blog.model.js');
const Branch = require('../models/branch.model.js');
// var async = require("async");


// POST a Category
exports.create = (req, res) => {
    // console.log(req.body);
    // Create a Category
    const customer = new Customer(req.body);

    // Save a Category in the MongoDB
    customer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FETCH all Brand
exports.findAllBranch = async(req, res) => {
    await Branch.find()
        .then(branch => {
            res.send(branch);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// FETCH all Brand
exports.findAllBrands = async(req, res) => {
    console.info('getting all Brands')
    await Brands.find()
        .then(brands => {
            res.send(brands);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FETCH all Blogs
exports.findAllBlogs = async(req, res) => {
    await Blog.find()
        .then(blogs => {
            res.send(blogs);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// FIND a Brand by name and Include Categories
exports.findBrandByName = (req, res) => {
    let query = [{
            $lookup: {
                from: "categories",
                localField: "categoryid",
                foreignField: "_id",
                as: "categories"
            }
        },
        { $match: { name: req.params.name } }
    ];
    // let query = { name: req.params.name };
    Brand.aggregate(query)
        .then(async(brand) => {
            if (!brand) {
                return res.status(404).send({
                    message: "Brand not found with Name " + req.params.name
                });
            }
            // console.log(brand)
            // var result = db.users.findOne({"name":"Tom Benzamin"},{"address_ids":1})
            // const start = async() => {
            //     const categories = [];
            //     await asyncForEach(brand.categoryid, async(c) => {
            //         const category = await Category.findById(c);
            //         categories.push(category);
            //     });
            //     // console.log('Done');
            //     brand.categorys = categories;
            //     res.send(brand);
            // }
            // start();
            res.send(brand);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Brand not found with name " + req.params.name
                });
            }
            return res.status(500).send({
                message: "Error retrieving Brand with name " + req.params.name
            });
        });
};

// FIND a Brand Promotions Products
exports.findBrandPromotions = (req, res) => {
    let query = [{
            $lookup: {
                from: "products",
                localField: "promotions",
                foreignField: "_id",
                as: "products"
            }
        },
        { $match: { _id: req.params.brandid } }
    ];
    // let query = { name: req.params.name };
    Brand.aggregate(query)
        .then(brand => {
            if (!brand) {
                return res.status(404).send({
                    message: "Brand not found with id " + req.params.brandid
                });
            }
            // const start = async() => {
            //     const products = [];
            //     await asyncForEach(brand.promotions, async(p) => {
            //         const product = await Product.findById(p);
            //         products.push(products);
            //     });
            //     // console.log('Done');
            //     res.send(products);
            // }
            // start();
            res.send(brand);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Brand not found with name " + req.params.name
                });
            }
            return res.status(500).send({
                message: "Error retrieving Brand with name " + req.params.name
            });
        });
};

// FIND a Brand by name and Include Categories
exports.findBrandCategoryProducts = (req, res) => {
    let query = { name: req.params.name };
    Brand.findOne(query)
        .then(async(brand) => {
            if (!brand) {
                return res.status(404).send({
                    message: "Brand not found with Name " + req.params.name
                });
            }
            console.log(req.params.categoryId);
            let que = [{
                    $lookup: {
                        from: "products",
                        // pipeline: [
                        //     { $match: { _id: brand._id } },
                        // ],
                        localField: "productid",
                        foreignField: "_id",
                        as: "products"
                    }
                },
                { $match: { _id: ObjectId(req.params.categoryId) } }
            ];
            // let querys = { brandid: brand._id, categoryid: req.params.categoryId };
            await Category.aggregate(que)
                .then(async(categorys) => {
                    // await Category.aggregate(que)
                    //     .then((categor) => {
                    //         res.send(categor);
                    //     }).catch(err => {
                    //         res.status(500).send({
                    //             message: err.message
                    //         });
                    //     });
                    res.send(categorys);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                });
            // res.send(brand);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Brand not found with name " + req.params.name
                });
            }
            return res.status(500).send({
                message: "Error retrieving Brand with name " + req.params.name
            });
        });
};

// FETCH all Brand With their Products
exports.findAllBrandProducts = async(req, res) => {
    console.log('fine All');
    await Brand.find()
        .then(async(brands) => {
            const start = async() => {
                const result = [];
                await asyncForEach(brands, async(brand) => {
                    let query = { brandid: cat._id };
                    const products = await Product.find(query);
                    result.push(products);
                });
                console.log('Done');
                res.send(result);
            }
            start();
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FETCH all Category
exports.findAllCategorys = async(req, res) => {
    await Category.find()
        .then(categorys => {
            res.send(categorys);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// FETC Category By Id
exports.findCategoryById = async(req, res) => {
    await Category.findById(req.params.categoryId)
        .then(categorys => {
            res.send(categorys);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FETCH all Categorys With their Products
exports.findAllCategoryProducts = async(req, res) => {
    console.log('fine All');
    await Category.find()
        .then(async(categorys) => {
            const start = async() => {
                const categories = [];
                await asyncForEach(categorys, async(cat) => {
                    let query = { categoryid: [cat._id] };
                    console.log(query);
                    cat.products = await Product.find(query);
                    categories.push(cat);
                });
                console.log('Done');
                res.send(categories);
            }
            start();
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// you will explain wat u understand
// FETCH all Products
exports.findAllProducts = async(req, res) => {
    await Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// FETCH all Products by CategoryId
exports.findAllProductsByCategory = async(req, res) => {
    let query = { categoryid: req.params.categoryId };
    await Product.find(query)
        .then(products => {
            res.send(products);
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

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}