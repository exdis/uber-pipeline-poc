const fs = require('fs');
const path = require('path');
const { scanner } = require('./utils');

class UberPipe {
    meta = null;
    raw = null;
    result = null;

    inputers = new Map();
    extractors = new Map();
    miners = new Map();
    outputers = new Map();

    constructor() {
        // scan modules for existing miners
        const modules = scanner();

        for (const [type, mods] of Object.entries(modules)) {
            for (const module of mods) {
                const moduleName = path.basename(module).replace(/\.js/, '').replace(/-/g, '/');
                this[type].set(moduleName, require(module));
            }
        }
    }

    input(...args) {
        this.inputers.get(args[0]).call(this, ...args.slice(1));

        return this;
    }

    extract(extractor) {
        this.extractors.get(extractor).call(this);

        return this;
    }

    mine(miner) {
        this.miners.get(miner).call(this);

        return this;
    }

    output(outputer) {
        this.outputers.get(outputer).call(this);

        return this;
    }

    debug() {
        console.log('### Raw:', this.raw);
        console.log('### Result:', this.result);

        return this;
    }
}

module.exports = UberPipe;