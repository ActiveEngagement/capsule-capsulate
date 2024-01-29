import { CheerioAPI } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export class FixTableAlignment extends BaseDomPlugin {
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
