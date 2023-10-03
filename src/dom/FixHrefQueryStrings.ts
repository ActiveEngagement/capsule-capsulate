import { AnyNode, Cheerio } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';

export default class FixFontColor extends BaseDomPlugin {

    async process($el: Cheerio<AnyNode>) {
        const href = $el.attr('href');

        if(!href) {
            return;
        }

        const matches = href.match(/(?<=\?)(.+\?*)/g);

        $el.attr('href', href.replace(matches[0], matches[0].replace(/\?/g, '&')));
    }
};