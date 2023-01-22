const init = require('./init');
const jsdom = require('./jsdom');
const Plugin = require('./Plugin');
const flatten = require('lodash.flatten');
const isFragment = require('./isFragment');

module.exports = class TaskRunner {

    constructor(plugins, options = {}) {
        this.options = options;
        this.tasks = init(plugins, options);
    }

    async process(src) {
        this.options.fragment = isFragment(src);
        
        src = await this.reduce('initialize', src);
        
        const dom = jsdom(src);

        await this.run('preprocess', dom);
        await this.run('process', dom);
        await this.run('postprocess', dom);
        
        if(this.options.fragment) {
            return this.reduce(
                'transform', dom.window.document.body.innerHTML.trim()
            );
        }

        return this.reduce('transform', dom.serialize());
    }

    async reduce(method, src, args = [], fn) {
        args = flatten([args, this]);

        return this.tasks.reduce(async(src, task) => {
            // Wait for the source since it's always a promise...
            src = await src;

            // If the task isn't a Plugin, throw an error
            if(!(task instanceof Plugin)) {
                throw new Error('The task must be an instance of Plugin');
            }

            // Execute the task method and wait for response
            let response = await task[method](src, ...args);
            
            if(fn instanceof Function) {
                response = fn(response);
            }
            
            // Return response or the source;
            return typeof response === 'undefined' ? src : response;
        }, Promise.resolve(src));
    }

    async run(method, dom, args) {
        return this.reduce(method, dom, args, response => {
            if(typeof response === 'string') {
                dom.window.document.write(response);

                return dom;
            }
            
            return response;
        });
    }

    isFragment() {
        return !!this.options.fragment;
    }

    fragment(value = true) {
        this.options.fragment = !!value;

        return this;
    }

    static make(...args) {
        return new this(...args);
    }

};