import { CheerioAPI } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export class FixMsoWrapper extends BaseDomPlugin {
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
