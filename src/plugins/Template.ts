import { CheerioAPI } from 'cheerio';
import nunjucks from 'nunjucks';
import BasePlugin from '../Plugin';
import { cheerio, isFragment } from '../helpers';

export type TemplateOptions = {
    data?: object,
    src?: string,
    nunjucks?: nunjucks.ConfigureOptions
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
        return this.compile(src);
    }

    async process($: CheerioAPI) {
        if(this.options.src) {
            const contents = isFragment($.html()) ? $.html() : $('body').html();

            const wrapped = this.compile(this.options.src, { contents });

            return cheerio(wrapped);
        }

        return $;
    }

    compile(src: string, data?: object) {
        nunjucks.configure(this.options.nunjucks);

        try {
            return nunjucks.renderString(
                src, Object.assign({}, data, this.options.data)
            );
        }
        catch(e) {
            console.log(e);
            
            return src;
        }
    }

};