import { AnyNode, Cheerio } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';
export default class FixLineHeight extends BaseDomPlugin {
    process($el: Cheerio<AnyNode>): Promise<void>;
}
