import { CheerioAPI } from 'cheerio';
import { type DomPlugin } from './DomPlugin';
import BasePlugin from './Plugin';

export default class ManipulateDom extends BasePlugin {

    constructor(
        protected plugins: DomPlugin[]
    ) {
        super();
    }

    async preprocess($: CheerioAPI) {
        for(const plugin of this.plugins) {
            $ = await plugin.preprocess($);
        }

        return $;
    }

    async process($: CheerioAPI) {
        for(const el of $('*')) {
            for(const plugin of this.plugins) {
                await plugin.process($(el), $);
            }
        }

        return $;
    }

    async postprocess($: CheerioAPI) {
        for(const plugin of this.plugins) {
            $ = await plugin.postprocess($);
        }

        return $;
    }

};