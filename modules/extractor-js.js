module.exports = function() {
    const parser = require('@babel/parser');
    this.result = parser.parse(this.raw, { sourceType: 'module' });
}