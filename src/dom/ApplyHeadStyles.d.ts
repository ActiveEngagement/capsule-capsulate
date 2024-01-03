import { CheerioAPI, Element } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';
export default class ApplyHeadStyles extends BaseDomPlugin {
    protected nodes: Element[];
    preprocess($: CheerioAPI): Promise<CheerioAPI>;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
