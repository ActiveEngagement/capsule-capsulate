const Plugin = require('../lib/Plugin');

module.exports = class ExtractTarget extends Plugin {

    defaultOptions() {
        return {
            target: null
        };
    }

    preprocess({ $ }) {
        if(this.options.selector) {
            const $els = $(this.options.selector);

            return $els.length && $els.get(0).outerHTML;
        }
    }

};