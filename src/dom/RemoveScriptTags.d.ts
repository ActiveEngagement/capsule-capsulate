import { CheerioAPI } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export class RemoveScriptTags extends BaseDomPlugin {
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
