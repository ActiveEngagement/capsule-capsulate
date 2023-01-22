const init = require('../lib/init');
const Plugin = require('../lib/Plugin');

module.exports = class ManipulateDom extends Plugin {

    constructor(plugins, options = {}) {
        super();

        this.plugins = init(plugins, options);
    }

    async preprocess(...args) {
        this.plugins.forEach(plugin => {
            plugin.preprocess(...args);
        });
    }

    async process(dom, ...args) {
        dom.window.document.querySelectorAll('*').forEach(el => {
            this.plugins.forEach(plugin => {
                plugin.process(el, dom.window.$(el), dom, ...args);
            });
        });
    }

    async postprocess(...args) {
        this.plugins.forEach(plugin => {
            plugin.postprocess(...args);
        });
    }

};