const UberPipe = require('.');

const pipe = new UberPipe();

// custom miner if needed
pipe.miners.set('miner/file/loc', function () {
    this.result = this.raw.split('\n').length;
});

pipe
    .input('inputer/file', './test-js.js')
    .mine('miner/file/imports')
    .output('outputer/console')
    .mine('miner/file/loc')
    .output('outputer/console')