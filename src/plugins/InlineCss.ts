import { CheerioAPI } from 'cheerio';
import juice, { type Options } from 'juice';
import BasePlugin from '../Plugin';
import { cheerio, encodeFreemarkerTags } from '../helpers';

export type InlineCssOptions = Options;

export default class InlineCss extends BasePlugin<InlineCssOptions> {

    defaultOptions(): InlineCssOptions {
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
            return cheerio(juice(encodeFreemarkerTags($.html()), this.options));
        }
        catch (e) {
            throw new Error('There is invalid CSS or <link> tags in this document.');
        }
    }

};