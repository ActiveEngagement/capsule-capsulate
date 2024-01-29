import { AnyNode, Cheerio } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export class FixFloatAlignment extends BaseDomPlugin {
    process($el: Cheerio<AnyNode>): Promise<void>;
}
