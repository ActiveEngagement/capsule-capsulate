import { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';

export class DecodeEntitiesInStyleAttributes extends BaseDomPlugin {

    async process($el: Cheerio<AnyNode>, $: CheerioAPI) {
        const style = $el.attr('style');

        if(!style) {
            return;
        }
        
        $el.attr('style', $('<div/>').html(style).text().replaceAll('"', "'"));
    }

};