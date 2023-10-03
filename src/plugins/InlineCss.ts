import { CheerioAPI } from 'cheerio';
import juice, { type Options } from 'juice';
import BasePlugin from '../Plugin';
import { cheerio } from '../helpers';

export default class InlineCss extends BasePlugin<Options> {

    defaultOptions(): Options {
        return {
            applyStyleTags: true,
            removeStyleTags: true,
        };
    }

    async process($: CheerioAPI) {
        return await this.inlineCss($);
    }

    async postprocess($: CheerioAPI) {
        return await this.inlineCss($);
    }

    protected async inlineCss($: CheerioAPI) {
        try {
            return cheerio(juice($.html(), this.options));
        }
        catch (e) {
            throw new Error('There is invalid CSS or <link> tags in this document.');
        }
    }

};