import { CheerioAPI } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';
export default class FixTableAlignment extends BaseDomPlugin {
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
