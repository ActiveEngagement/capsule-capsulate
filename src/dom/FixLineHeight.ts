import { AnyNode, Cheerio } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';

export class FixLineHeight extends BaseDomPlugin {

    async process($el: Cheerio<AnyNode>) {
        if($el.css('line-height') && !$el.css('mso-line-height-rule')) {
            $el.css('mso-line-height-rule', 'exactly');
        }
    }

}