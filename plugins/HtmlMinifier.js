const minify = require('html-minifier').minify;
const Plugin = require('../lib/Plugin');

module.exports = class HtmlMinifier extends Plugin {

    defaultOptions() {
        // More options can be found here:
        // https://www.npmjs.com/package/html-minifier
        return {
            collapseWhitespace: true,
            minifyCSS: true,
            removeComments: true
        };
    }

    async transform(src) {
        return minify(src, this.options);
    }

};