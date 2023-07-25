import { CheerioAPI } from 'cheerio';
import nunjucks from 'nunjucks';
import BasePlugin from '../Plugin';

// const isFragment = require('../lib/isFragment');
// const nunjucks = require('nunjucks');
// const Plugin = require('../lib/Plugin');
// const size = require('lodash.size');
// const jsdom = require('../lib/jsdom');

export type TemplateOptions = {
    data: object,
    src?: string,
    nunjucks: {
        autoescape: boolean   
    }
}

export default class Template extends BasePlugin<TemplateOptions> {

    defaultOptions() {
        return {
            data: {},
            src: null,
            nunjucks: {
                autoescape: false
            }
        };
    }

    async initialize(src: string) {
        return this.compile(src, this.options.data);
    }

    async process($: CheerioAPI) {
        if(this.options.src) {
            // const dom = $(this.compile(
            //     this.options.src, Object.assign({}, this.options.data), $('body').html()
            // ));
            
            // dom('head').append($('head').prop('children'));

            // return dom.window.document.documentElement.innerHTML;
        }

        return $;
    }

    // async postprocess(dom) {
    //     return (
    //         !dom.window.document.doctype ? '<!DOCTYPE html>' : ''
    //     ) + dom.serialize();
    // }

    compile(src: string, data: object) {
        nunjucks.configure(this.options.nunjucks);

        try {
            return nunjucks.render(src, data);
        }
        catch(e) {
            return src;
        }
    }

};