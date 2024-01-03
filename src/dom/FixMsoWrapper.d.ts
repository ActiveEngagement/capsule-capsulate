import { CheerioAPI } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';
export default class FixMsoWrapper extends BaseDomPlugin {
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
