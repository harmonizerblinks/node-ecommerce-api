const User = require('../models/users.model.js');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/mongodb.config.js');


// POST a User
exports.create = (req, res) => {
    // console.log(req.body);
    // Create a User
    const user = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10), //password Encryption,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender,
        usertype: req.body.usertype,
        roles: req.body.roles,
        position: req.body.position
    });
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password

    const query = { username };
    User.findOne(query)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with username " + username
                });
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (passwordIsValid) {
                const token = jwt.sign({
                    type: 'user',
                    data: {
                        _id: user._id,
                        fullname: user.fullname,
                        username: user.username,
                        mobile: user.mobile,
                        email: user.email,
                        roles: user.roles
                    },
                }, config.secret, {
                    expiresIn: 684800
                });
                res.send({ success: true, access_token: token });
            } else {
                res.status(500).send({ success: false, message: 'Password is not correct' })
            }
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with username " + username
                });
            }
            return res.status(500).send({
                message: "Error retrieving User with username " + username
            });
        });
};

exports.comparePassword = (password, hash, callback) => {
    bcrypt.hash(password, hash, (err, isMatch) => {
        if (err) return err;
        return isMatch;
    })
};

exports.profile = (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.status(500).send({
            message: "Authentication not Valid"
        });
    }
};

// FETCH all Users
exports.findAll = (req, res) => {
    console.log('fine All');
    User.find()
        .then(users => {
            // console.log(users)
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FIND a User
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving User with id " + req.params.userId
            });
        });
};

// Find User By username 
exports.findOneByUsername = (req, res) => {
    const query = { username: req.params.username }
    User.findOne(query)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with username " + req.params.username
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with username " + req.params.username
                });
            }
            return res.status(500).send({
                message: "Error retrieving User with username " + req.params.username
            });
        });
};

// UPDATE a User
exports.update = (req, res) => {
    var user = req.body;
    user.updated = Date.now;
    // Find user and update it
    console.log(req.body)
    User.findByIdAndUpdate(req.params.userId, user, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            console.log(err);
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });
};

// DELETE a User
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};