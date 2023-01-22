const isFragment = require('../lib/isFragment');
const nunjucks = require('nunjucks');
const Plugin = require('../lib/Plugin');
const size = require('lodash.size');
const jsdom = require('../lib/jsdom');

module.exports = class Template extends Plugin {

    constructor(options) {
        super(options);

        this.env = nunjucks.configure(this.options.nunjucks);
    }

    defaultOptions() {
        return {
            data: {},
            src: null,
            nunjucks: {
                autoescape: false
            }
        };
    }

    async initialize(src, runner) {
        if(this.options.src) {
            runner.fragment(isFragment(this.options.src));
        }

        return this.compile(src, this.options.data);
    }

    async process({ $ }) {
        if(this.options.src) {
            const dom = jsdom(this.compile(
                this.options.src, Object.assign({}, this.options.data), $('body').html()
            ));
            
            dom.$('head').append($('head').prop('children'));

            return dom.window.document.documentElement.innerHTML;
        }
    }

    async postprocess(dom) {
        return (
            !dom.window.document.doctype ? '<!DOCTYPE html>' : ''
        ) + dom.serialize();
    }

    compile(src, data, contents) {
        if(!size(data) && !contents) {
            return src;
        }

        try {
            return this.env.renderString(src, Object.assign({}, data, {
                contents
            }));
        }
        catch (e) {
            return src;
        }
    }

};