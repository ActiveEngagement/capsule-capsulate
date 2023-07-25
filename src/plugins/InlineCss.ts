import { CheerioAPI } from 'cheerio';
import juice from 'juice';
import BasePlugin from '../Plugin';
import { cheerio } from '../helpers';

export type InlineCssOptions = {
    
};

export default class InlineCss extends BasePlugin<InlineCssOptions> {

    async process($: CheerioAPI) {
        return await this.inlineCss($);
    }

    async postprocess($: CheerioAPI) {
        return await this.inlineCss($);
    }

    protected async inlineCss($: CheerioAPI) {
        try {
            return cheerio(juice($.html()));
        }
        catch(e) {
            throw new Error('There is invalid CSS or <link> tags in this document.');
        }
    }

};