const Plugin = require('../lib/Plugin');

module.exports = class ApplyHeadStyles extends Plugin {

    constructor(options) {
        super(options);

        this.nodes = [];
    }

    async preprocess({ window: { document }}) {
        document.querySelectorAll('head style').forEach(el => {
            this.nodes.push(el);
        });
    }

    async postprocess({ window: { document }}) {
        if(!document.querySelector('head')) {
            $('<head />').insertBefore($('body'));
        }

        const head = document.querySelector('head');

        this.nodes.forEach(el => head.append(el));
    }

};