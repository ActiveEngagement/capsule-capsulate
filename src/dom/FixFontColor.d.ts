import { AnyNode, Cheerio } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';
export default class FixFontColor extends BaseDomPlugin {
    process($el: Cheerio<AnyNode>): Promise<void>;
}
