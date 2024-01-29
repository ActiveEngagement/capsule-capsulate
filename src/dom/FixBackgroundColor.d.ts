import { AnyNode, Cheerio } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export class FixBackgroundColor extends BaseDomPlugin {
    process($el: Cheerio<AnyNode>): Promise<void>;
}
