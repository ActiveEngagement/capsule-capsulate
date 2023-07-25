import { AnyNode, Cheerio } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';

export default class FixBackgroundColor extends BaseDomPlugin {

    async process($el: Cheerio<AnyNode>) {
        if($el.css('background-color')) {
            $el.attr('bgcolor', $el.css('background-color'));
        }
    }

}