import { AnyNode, Cheerio } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';

export default class FixFontColor extends BaseDomPlugin {

    async process($el: Cheerio<AnyNode>) {
        if($el.css('color')) {
            $el.attr('color', $el.css('color'));
        }
    }

};