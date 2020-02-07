'use strict';

const path = require('path');
const ABSPATH = path.dirname(path.join(process.mainModule.filename, '../'));
const gm = require('gm');
const fs = require('fs');

const exists = (path) => {
    try {
        return fs.statSync(path).isFile();
    } catch (e) {
        return false;
    }
};

const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

class Media {
    constructor(path) {
        this.src = path;
    }

    isValidMedia(src) {
        return /\.(jpe?g|png)$/.test(src);
    }

    isValidBaseDir(src) {
        return /^\/public\/items/.test(src);
    }

    thumb(request, response) {
        let image = ABSPATH + this.src;
        console.log(image);
        console.log(ABSPATH);
        // if (this.isValidBaseDir(this.src)) { console.log('media is not valid'); }

        if (this.isValidBaseDir(this.src) && this.isValidMedia(this.src) && exists(image)) {

            let width = (request.query.w && /^\d+$/.test(request.query.w)) ? request.query.w : '500';
            let height = (request.query.h && /^\d+$/.test(request.query.h)) ? request.query.h : '500';
            let extension = getFileExtension(this.src);
            let mime = (extension === 'jpeg' || extension === 'jpg') ? 'jpeg' : 'png';

            response.type(mime);

            gm(image).resize(width, height).autoOrient().stream().pipe(response);
        } else {
            response.sendStatus(404);
        }
    }
}

module.exports = Media;