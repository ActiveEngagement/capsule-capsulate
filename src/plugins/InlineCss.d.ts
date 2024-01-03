import { CheerioAPI } from 'cheerio';
import { type Options } from 'juice';
import BasePlugin from '../Plugin';
export type InlineCssOptions = Options;
export default class InlineCss extends BasePlugin<InlineCssOptions> {
    defaultOptions(): InlineCssOptions;
    process($: CheerioAPI): Promise<CheerioAPI>;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
    protected inlineCss($: CheerioAPI): Promise<CheerioAPI>;
}
