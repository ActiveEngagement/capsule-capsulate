import { CheerioAPI } from 'cheerio';
import BasePlugin from '../Plugin';
export type ExtractTargetOptions = {
    selector?: string;
};
export default class ExtractTarget extends BasePlugin<ExtractTargetOptions> {
    preprocess($: CheerioAPI): Promise<CheerioAPI>;
}
