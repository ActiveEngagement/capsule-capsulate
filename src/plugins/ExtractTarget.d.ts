import { CheerioAPI } from 'cheerio';
import { BasePlugin } from '../Plugin';
export type ExtractTargetOptions = {
    selector?: string;
};
export class ExtractTarget extends BasePlugin<ExtractTargetOptions> {
    preprocess($: CheerioAPI): Promise<CheerioAPI>;
}
