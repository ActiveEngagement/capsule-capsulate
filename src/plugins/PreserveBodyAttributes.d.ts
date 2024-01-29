import { CheerioAPI } from 'cheerio';
import { BasePlugin } from '../Plugin';
export class PreserveBodyAttributes extends BasePlugin {
    protected classes: string[];
    protected attrs: Record<string, string>;
    preprocess($: CheerioAPI): Promise<CheerioAPI>;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
