import { CheerioAPI } from 'cheerio';
import { type DomPlugin } from './DomPlugin';
import { BasePlugin } from './Plugin';

export class ManipulateDom extends BasePlugin {

    protected plugins: DomPlugin[];

    constructor(
        plugins: DomPlugin[]
    ) {
        super();

        this.plugins = plugins.filter(plugin => plugin.enabled);
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

    async transform(src: string) {
        for(const plugin of this.plugins) {
            src = await plugin.transform(src);
        }

        return src;
    }

};