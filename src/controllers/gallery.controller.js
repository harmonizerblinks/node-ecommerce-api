const Gallery = require('../models/gallery.model.js');
const config = require('../config/mongodb.config.js');
var path = require('path');
// const sharp = require('sharp');
const fs = require('fs');
var appDir = path.dirname(require.main.filename);


// POST a Gallery
exports.create = async(req, res) => {
    console.info('started', req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ message: 'No files were uploaded.' });
    }

    if (!req.params.type) {
        return res.status(400).send({ message: 'Image Type must be Provided.' });
    }
    console.log(req.files.file);
    // The name of the input field (i.e. "gallery") is used to retrieve the uploaded file
    const file = req.files.file;
    // const fname = new Date().getTime() + file.name.replace(/ /g, "_");
    const fname = await generateOTP(4) + file.name.replace(/ /g, "_");
    const name = appRoot + '/public/' + req.params.type + '/' + fname;
    console.log(name);
    // Use the mv() method to place the file somewhere on your server
    file.mv(name, function(err) {
        if (err) {
            // console.log(err);
            return res.status(500).send(err);
        }
        var imageurl = req.params.type + '/' + fname;
        // Create a Gallery
        const gallery = new Gallery({ name: fname, imageurl: imageurl });

        // Save a Gallery in the MongoDB
        gallery.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        // res.send('File uploaded!');
    });
};

exports.upload = async(req, res) => {
    console.info('started');
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ message: 'No files were uploaded.' });
    }

    if (!req.params.type) {
        return res.status(400).send({ message: 'Image Type must be Provided.' });
    }
    console.log(req.files.file);
    // The name of the input field (i.e. "gallery") is used to retrieve the uploaded file
    const file = req.files.file;
    const fname = new Date().getTime() + file.name.replace(/ /g, "_");
    const name = appRoot + '/../../public/' + req.params.type + '/' + fname;
    console.log(name)
        // Use the mv() method to place the file somewhere on your server
    file.mv(name, function(err) {
        if (err) {
            // console.log(err);
            return res.status(500).send(err);
        }
        if (req.params.type === 'items') {
            sharp(name).resize({ width: 500, height: 500 }).toFile(name).then((data) => {
                // fs.unlinkSync();
                console.log(data);
            }).catch((err) => {
                console.log(err);
            });
        }
        // console.log(result);
        // Create a Gallery
        const gallery = new Gallery({ name: fname, imageurl: config.app + req.params.type + '/' + fname });

        // Save a Gallery in the MongoDB
        gallery.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        // res.send('File uploaded!');
    });
};

// FETCH all Gallerys
exports.findAll = (req, res) => {
    console.log('fine All');
    Gallery.find().sort({ created: -1 })
        .then(gallerys => {
            // console.log(gallerys)
            res.send(gallerys);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// FIND a Gallery
exports.findOne = (req, res) => {
    Gallery.findById(req.params.galleryId)
        .then(gallery => {
            if (!gallery) {
                return res.status(404).send({
                    message: "Gallery not found with id " + req.params.galleryId
                });
            }
            res.send(gallery);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Gallery not found with id " + req.params.galleryId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Gallery with id " + req.params.galleryId
            });
        });
};

// UPDATE a Gallery
exports.update = (req, res) => {
    var body = req.body;
    // console.log(body)
    body.updated = new Date();
    // Find gallery and update it
    Gallery.findByIdAndUpdate(req.params.galleryId, body, { new: true })
        .then(gallery => {
            if (!gallery) {
                return res.status(404).send({
                    message: "Gallery not found with id " + req.params.galleryId
                });
            }
            res.send(gallery);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Gallery not found with id " + req.params.galleryId
                });
            }
            return res.status(500).send({
                message: "Error updating gallery with id " + req.params.galleryId
            });
        });
};

// DELETE a Gallery
exports.delete = (req, res) => {
    Gallery.findByIdAndRemove(req.params.galleryId)
        .then(gallery => {
            if (!gallery) {
                return res.status(404).send({
                    message: "Gallery not found with id " + req.params.galleryId
                });
            }
            const name = appRoot + '/public/' + gallery.imageurl;
            // delete file named Synchronously
            // fs.unlinkSync(name);
            fs.unlink(name, (err) => {
                if (err) {
                    console.error(err)
                    return
                }

                //file removed
            })
            res.send({ message: "Image deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Gallery not found with id " + req.params.galleryId
                });
            }
            return res.status(500).send({
                message: "Could not delete gallery with id " + req.params.galleryId
            });
        });
};

async function generateOTP(length) {
    var digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var otpLength = length;
    var otp = '';

    for (let i = 1; i <= otpLength; i++) {
        var index = Math.floor(Math.random() * (digits.length));

        otp = otp + digits[index];
    }
    return otp.toUpperCase();
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}