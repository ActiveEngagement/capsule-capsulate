import { CheerioAPI } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export class FixMsoButtons extends BaseDomPlugin {
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
