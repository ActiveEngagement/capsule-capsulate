import { CheerioAPI } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';
export default class ApplyListStyles extends BaseDomPlugin {
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
