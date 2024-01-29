import { CheerioAPI } from 'cheerio';
import nunjucks from 'nunjucks';
import { BasePlugin } from '../Plugin';
import { cheerio, isFragment } from '../helpers';

export type TemplateOptions = {
    data?: object,
    src?: string | null,
    nunjucks?: nunjucks.ConfigureOptions
}

export class Template extends BasePlugin<TemplateOptions> {

    defaultOptions() {
        return {
            data: {},
            src: undefined,
            nunjucks: {
                autoescape: false
            }
        };
    }

    async initialize(src: string) {
        return this.compile(src);
    }

    async process($: CheerioAPI) {
        if(!this.options.src) {
            return $;
        }

        const contents = isFragment($.html()) ? $.html() : $('body').html();

        // if(this.options.previewText) {
        //     contents = contents?.replace(this.options.previewText, '') ?? null;
        // }

        let wrapped = this.compile(this.options.src, { contents });

        const bodyTag = wrapped.match(/<body(.+)?>/);

        if(bodyTag) {
            const index = wrapped.indexOf(bodyTag[0]) + bodyTag[0].length;

            wrapped = wrapped.slice(0, index)
                // + (this.options.previewText ?? '')
                + wrapped.slice(index);
        }

        return cheerio(wrapped);
    }

    compile(src: string, data?: object) {
        nunjucks.configure(this.options.nunjucks ?? {});

        try {
            return nunjucks.renderString(
                src, Object.assign({}, data, this.options.data)
            );
        }
        catch (e) {
            return src;
        }
    }

};