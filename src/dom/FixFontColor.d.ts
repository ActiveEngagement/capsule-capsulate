import { AnyNode, Cheerio } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export class FixFontColor extends BaseDomPlugin {
    process($el: Cheerio<AnyNode>): Promise<void>;
}
