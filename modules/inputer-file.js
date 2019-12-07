const fs = require('fs');
const path = require('path');

module.exports = function(file) {
    this.meta = {
        filename: path.resolve(file),
        extension: path.extname(file)
    }

    this.raw = fs.readFileSync(file).toString();
};
