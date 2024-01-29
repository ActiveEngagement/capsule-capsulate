import { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export class RemoveDisplayNone extends BaseDomPlugin {
    protected nodes: AnyNode[];
    process($el: Cheerio<AnyNode>): Promise<void>;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
