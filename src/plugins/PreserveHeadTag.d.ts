import { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import BasePlugin from '../Plugin';
export default class PreserveHeadTag extends BasePlugin {
    protected head?: Cheerio<AnyNode>;
    preprocess($: CheerioAPI): Promise<CheerioAPI>;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
