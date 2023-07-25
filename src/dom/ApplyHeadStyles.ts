import { CheerioAPI, Element } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';

export class ApplyHeadStyles extends BaseDomPlugin {

    protected nodes: Element[]

    async preprocess($: CheerioAPI) {
        for(const el of $('head style')) {
            this.nodes.push(el);
        }

        return $;
    }

    async postprocess($: CheerioAPI) {
        if(!$('head')) {
            $('<head />').insertBefore($('body'));
        }

        for(const node of this.nodes) {
            $(node).appendTo($('head'))
        }

        return $;
    }

};