import { minify } from 'html-minifier';
import BasePlugin from '../Plugin';

// const minify = require('html-minifier').minify;
// const Plugin = require('../lib/Plugin');

export default class HtmlMinifier extends BasePlugin {

    defaultOptions() {
        // More options can be found here:
        // https://www.npmjs.com/package/html-minifier
        return {
            collapseWhitespace: true,
            minifyCSS: true,
            removeComments: true
        };
    }

    async transform(src: string) {
        return minify(src, this.options);
    }

};