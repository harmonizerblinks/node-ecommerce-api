const Fliter = require('../models/fliter.model.js');


// POST a Fliter
exports.create = async(req, res) => {
    // console.log(req.body);
    // Create a Fliter
    const fliter = new Fliter(req.body);
    fliter.code = null;
    var code = fliter.name.toLowerCase();
    fliter.code = code.replace(/\s+/g, '-') + '-' + await generateOTP(6);

    // Save a Fliter in the MongoDB
    fliter.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FETCH all Fliters
exports.findAll = (req, res) => {
    console.log('fine All');
    let query = [{
        $lookup: {
            from: "categories",
            localField: "categoryid",
            foreignField: "_id",
            as: "categories"
        }
    }];
    Fliter.aggregate(query)
        .then(fliters => {
            // console.log(fliters)
            res.send(fliters);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FIND a Fliter
exports.findOne = (req, res) => {
    Fliter.findById(req.params.fliterId)
        .then(fliter => {
            if (!fliter) {
                return res.status(404).send({
                    message: "Fliter not found with id " + req.params.fliterId
                });
            }
            res.send(fliter);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Fliter not found with id " + req.params.fliterId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Fliter with id " + req.params.fliterId
            });
        });
};

// UPDATE a Fliter
exports.update = (req, res) => {
    var fliter = req.body;
    fliter.updated = new Date();
    // Find fliter and update it
    Fliter.findByIdAndUpdate(req.params.fliterId, fliter, { new: true })
        .then(fliter => {
            if (!fliter) {
                return res.status(404).send({
                    message: "Fliter not found with id " + req.params.fliterId
                });
            }
            res.send(fliter);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Fliter not found with id " + req.params.fliterId
                });
            }
            return res.status(500).send({
                message: "Error updating fliter with id " + req.params.fliterId
            });
        });
};

// DELETE a Fliter
exports.delete = (req, res) => {
    Fliter.findByIdAndRemove(req.params.fliterId)
        .then(fliter => {
            if (!fliter) {
                return res.status(404).send({
                    message: "Fliter not found with id " + req.params.fliterId
                });
            }
            res.send({ message: "Fliter deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Fliter not found with id " + req.params.fliterId
                });
            }
            return res.status(500).send({
                message: "Could not delete fliter with id " + req.params.fliterId
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
    return otp.toLowerCase();
}