const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Sharp = require('sharp');

// const fs = require("fs");
// const Sharp = require('sharp');

resizeImage = (req, res, next) => {

    const imagePath = "../../public/" + req._parsedOriginalUrl.pathname;
    console.log(imagePath);
    // if (req.query.format != null) {

    if (fs.existsSync(imagePath)) {

        const format = req.query.format ? req.query.format : "webp";
        const width = req.query.width ? parseInt(req.query.width) : 500;
        const height = req.query.height ? parseInt(req.query.height) : 500;
        const crop = req.query.crop ? req.query.crop : "cover";

        const stream = fs.createReadStream(imagePath);

        const transform = Sharp().resize(width, height, {
            fit: crop
        }).toFormat(format, {
            quality: 85
        });

        res.set('Content-Type', `image/${format}`);
        var file = stream.stream().pipe(transform).pipe(res);
        console.log(file);

        return stream;
    }
    //ensuring the file path is correct
    // }
    next();
};

const image = {
    resizeImage: resizeImage,
};

module.exports = image.resizeImage;