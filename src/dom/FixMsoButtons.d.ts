import { CheerioAPI } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';
export default class FixMsoButtons extends BaseDomPlugin {
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
