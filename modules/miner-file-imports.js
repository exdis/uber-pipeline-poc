module.exports = function() {
    const { extension } = this.meta;

    switch (extension) {
        case '.js':
            this.extract('extractor/js');

            const traverse = require('@babel/traverse').default;

            const imports = [];

            traverse(this.result, {
                ImportDeclaration: path => {
                    imports.push(path);
                }
            })

            this.result = imports;
            break;
    }
}