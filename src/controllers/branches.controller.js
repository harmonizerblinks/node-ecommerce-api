const Branch = require('../models/branch.model.js');


// POST a Branch
exports.create = (req, res) => {
    // console.log(req.body);
    // Create a Branch
    const branch = new Branch(req.body);

    // Save a Branch in the MongoDB
    branch.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// FETCH all Branchs
exports.findAll = (req, res) => {
    console.log('fine All');
    Branch.find()
        .then(branchs => {
            // console.log(branchs)
            res.send(branchs);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


// FIND a Branch
exports.findOne = (req, res) => {
    Branch.findById(req.params.branchId)
        .then(branch => {
            if (!branch) {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.branchId
                });
            }
            res.send(branch);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.branchId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Branch with id " + req.params.branchId
            });
        });
};

// UPDATE a Branch
exports.update = (req, res) => {
    var branch = req.body;
    branch.updated = new Date();
    // Find branch and update it
    Branch.findByIdAndUpdate(req.params.branchId, branch, { new: true })
        .then(branch => {
            if (!branch) {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.branchId
                });
            }
            res.send(branch);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.branchId
                });
            }
            return res.status(500).send({
                message: "Error updating branch with id " + req.params.branchId
            });
        });
};

// DELETE a Branch
exports.delete = (req, res) => {
    Branch.findByIdAndRemove(req.params.branchId)
        .then(branch => {
            if (!branch) {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.branchId
                });
            }
            res.send({ message: "Branch deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.branchId
                });
            }
            return res.status(500).send({
                message: "Could not delete branch with id " + req.params.branchId
            });
        });
};