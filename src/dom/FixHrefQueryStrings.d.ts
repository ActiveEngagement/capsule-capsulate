import { AnyNode, Cheerio } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';
export default class FixHrefQueryStrings extends BaseDomPlugin {
    process($el: Cheerio<AnyNode>): Promise<void>;
}
