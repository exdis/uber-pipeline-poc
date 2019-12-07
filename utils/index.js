const fs = require('fs');
const path = require('path');

const masks = {
    inputers: /inputer-.*\.js$/,
    extractors: /extractor-.*\.js$/,
    miners: /miner-.*\.js$/,
    outputers: /outputer-.*\.js$/
};

const scanner = () => {
    const result = {
        inputers: [],
        extractors: [],
        miners: [],
        outputers: []
    };

    const modules = fs.readdirSync('./modules');

    for (const module of modules) {
        for (const [type, mask] of Object.entries(masks)) {
            if (mask.test(module)) {
                result[type].push(path.resolve('modules', module));
                break;
            }
        }
    }

    return result;
};

module.exports = {
    scanner
};