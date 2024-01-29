import { AnyNode, Cheerio } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export class FixLineHeight extends BaseDomPlugin {
    process($el: Cheerio<AnyNode>): Promise<void>;
}
