import { CheerioAPI } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';
export default class RemoveScriptTags extends BaseDomPlugin {
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
