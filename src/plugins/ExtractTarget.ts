import { CheerioAPI } from 'cheerio';
import BasePlugin from '../Plugin';
import { cheerio } from '../helpers';

export type ExtractTargetOptions = {
    selector?: string
}

export default class ExtractTarget extends BasePlugin<ExtractTargetOptions> {

    async preprocess($: CheerioAPI) {
        if(this.options.selector) {
            const $el = $(this.options.selector);

            const child = $el.get(0);

            if(child) {
                return cheerio([ child ]);
            }
        }

        return $;
    }

};