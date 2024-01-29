import { CheerioAPI } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export class ApplyListStyles extends BaseDomPlugin {
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
