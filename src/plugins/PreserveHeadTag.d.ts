import { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { BasePlugin } from '../Plugin';
export class PreserveHeadTag extends BasePlugin {
    protected head?: Cheerio<AnyNode>;
    preprocess($: CheerioAPI): Promise<CheerioAPI>;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
