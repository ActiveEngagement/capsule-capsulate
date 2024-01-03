import { AnyNode, Cheerio } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';
export default class FixBackgroundColor extends BaseDomPlugin {
    process($el: Cheerio<AnyNode>): Promise<void>;
}
