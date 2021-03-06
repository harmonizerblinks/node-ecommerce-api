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
exports.getFeaturedCategory = async(req, res) => {
    // console.log(req.body);
    await Category.find({ featured: true, status: true }).sort({ sort: 1 })
        .then(categorys => {
            res.send(categorys);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FETCH all Fliters
exports.findAll = (req, res) => {
    console.log('fine All');
    Fliter.find({ status: true })
        .then(fliters => {
            // console.log(fliters)
            res.send(fliters);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FETCH all Brand
exports.findAllBranch = async(req, res) => {
    await Branch.find({ status: true })
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
    await Brands.find().sort({ sort: 1 })
        .then(brands => {
            res.send(brands);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// FETCH all Brand
exports.findAllFeaturedBrands = async(req, res) => {
    console.info('getting all Brands')
    await Brands.find({ featured: true, status: true }).sort({ sort: 1 })
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
    await Blog.find({ status: true }).sort({ created: -1 })
        .then(blogs => {
            res.send(blogs);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// FETCH Single Blogs
exports.findAllBlogById = async(req, res) => {
    await Blog.findOne({ code: req.params.blogId })
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
        { $match: { name: req.params.name, status: true } }
    ];
    // let query = { name: req.params.name };
    Brand.aggregate(query).sort({ sort: 1 })
        .then(async(brand) => {
            if (!brand) {
                return res.status(404).send({
                    message: "Brand not found with Name " + req.params.name
                });
            }
            console.log(brand[0].categoryid);
            let catquery = [
                { $match: { _id: { $in: brand[0].categoryid } } }
            ];
            // console.log(brand)
            // var result = db.users.findOne({"name":"Tom Benzamin"},{"address_ids":1})
            const start = async() => {
                Category.aggregate(catquery).sort({ sort: 1 })
                    .then(async(cats) => {
                        // await asyncForEach(cats, async(p) => {
                        //     var products = await arrayRemoveBrandId(p.products, brand[0]._id);
                        //     console.log(products);
                        // });
                        brand[0].categories = cats;
                        res.send(brand[0]);
                    })
            }
            start();
            // res.send(brand[0]);
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
        { $match: { _id: ObjectId(req.params.brandId) } }
    ];
    // let query = { name: req.params.name };
    Brand.aggregate(query).sort({ sort: 1 })
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
    let query = { name: req.params.name, status: true };
    Brand.findOne(query).sort({ sort: 1 })
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
                        // let: { brandid: brand._id, productid: "$productid" },
                        localField: "productid",
                        foreignField: "_id",
                        as: "products"
                    }
                },
                { $match: { _id: ObjectId(req.params.categoryId), status: true } }
            ];
            // let querys = { brandid: brand._id, categoryid: req.params.categoryId };
            await Category.aggregate(que)
                .then(async(category) => {
                    // category[0].products = await arrayRemoveBrandId(category[0].products, brand._id);
                    // console.log(category);
                    let querys = [{
                        $match: { _id: { $in: category[0].productid }, brandid: ObjectId(brand._id), status: true }
                    }];
                    await Product.aggregate(querys)
                        .then(async(products) => {
                            category[0].products = products;
                            res.send(category[0]);
                        }).catch(err => {
                            res.status(500).send({
                                message: err.message
                            });
                        });

                    // res.send(category[0]);
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
    await Brand.find({ status: true }).sort({ sort: 1 })
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
    let query = [{
        $lookup: {
            from: "products",
            localField: "productid",
            foreignField: "_id",
            as: "products"
        }
    }, ];
    await Category.aggregate(query).sort({ sort: 1 })
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
    let query = [{
            $lookup: {
                from: "products",
                localField: "productid",
                foreignField: "_id",
                as: "products"
            }
        },
        { $match: { _id: ObjectId(req.params.categoryId), status: true } }
    ];
    await Category.aggregate(query)
        .then(categorys => {
            res.send(categorys[0]);
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
    await Product.find({ status: true })
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
    let query = { categoryid: req.params.categoryId, status: true };
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
    console.log(req.params.productId);
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

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function arrayRemoveBrandId(arr, val) {
    return await arr.filter((ele) => {
        console.log(ele.brandid, val);
        return ele.brandid == val;;
    });
}