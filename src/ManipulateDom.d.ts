import { CheerioAPI } from 'cheerio';
import { type DomPlugin } from './DomPlugin';
import BasePlugin from './Plugin';
export default class ManipulateDom extends BasePlugin {
    protected plugins: DomPlugin[];
    constructor(plugins: DomPlugin[]);
    preprocess($: CheerioAPI): Promise<CheerioAPI>;
    process($: CheerioAPI): Promise<CheerioAPI>;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
