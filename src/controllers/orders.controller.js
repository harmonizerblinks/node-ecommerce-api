const Order = require('../models/order.model.js');


// POST a Order
exports.create = (req, res) => {
    // console.log(req.body);
    // Create a Order
    const order = new Order(req.body);

    // Save a Order in the MongoDB
    order.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FETCH all Orders
exports.findAll = (req, res) => {
    console.log('fine All');
    Order.find()
        .then(orders => {
            // console.log(orders)
            res.send(orders);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FIND a Order
exports.findOne = (req, res) => {
    Order.findById(req.params.orderId)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Order with id " + req.params.orderId
            });
        });
};

// UPDATE a Order
exports.update = (req, res) => {
    // Find order and update it
    Order.findByIdAndUpdate(req.params.orderId, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            email: req.body.email,
            mobile: req.body.mobile,
            gender: req.body.mobile,
            updated: Date.now
        }, { new: true })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            return res.status(500).send({
                message: "Error updating order with id " + req.params.orderId
            });
        });
};

// DELETE a Order
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            res.send({ message: "Order deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            return res.status(500).send({
                message: "Could not delete order with id " + req.params.orderId
            });
        });
};