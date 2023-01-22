const inlineCss = require('inline-css');
const Plugin = require('../lib/Plugin');

module.exports = class InlineCss extends Plugin {

    defaultOptions() {
        // More options can be found here:
        // https://www.npmjs.com/package/inline-css
        return {
            url: '/',
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: true,
            removeLinkTags: true,
            preserveMediaQueries: true
        };
    }

    async process(dom) {
        try {
            return await inlineCss(dom.serialize(), this.options);
        }
        catch(e) {
            throw new Error('There is invalid CSS or <link> tags in this document.');
        }
    }

    async postprocess(dom) {
        try {
            return await inlineCss(dom.serialize(), this.options);
        }
        catch(e) {
            throw new Error('There is invalid CSS or <link> tags in this document.');
        }
    }

};