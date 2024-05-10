import { Cheerio, CheerioAPI, Element } from 'cheerio';
import { BasePlugin } from '../Plugin';
import { cheerio } from '../helpers';

export type PreviewTextOptions = {
    html?: string | (($: CheerioAPI) => PreviewTextHtml);
}

export type PreviewTextHtml = Cheerio<Element> | string | undefined | null;

function toString(subject: PreviewTextHtml): string|undefined {
    if(!subject) {
        return undefined;
    }

    if(typeof subject === 'object') {
        return subject.toString();
    }

    return subject;
}

export class PreviewText extends BasePlugin<PreviewTextOptions> {

    protected html: string|undefined = undefined;

    async preprocess($: CheerioAPI) {
        const html = toString(
            typeof this.options.html === 'function'
                ? this.options.html($)
                : this.options.html
        );

        if(!html) {
            return $;
        }

        this.html = html;
        
        return cheerio($.html().replace(html, ''));
    }

    async postprocess($: CheerioAPI) {
        if(!this.html) {
            return $;
        }

        if($('body').length) {
            $('body').prepend(this.html);
        }
        else {
            $.root().prepend(this.html);
        }

        return $;
    }

};