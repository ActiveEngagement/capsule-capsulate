import { CheerioAPI } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';
export type FixResponsiveImagesOptions = {
    maxWidth: number;
};
export default class FixResponsiveImages extends BaseDomPlugin<FixResponsiveImagesOptions> {
    defaultOptions(): {
        maxWidth: number;
    };
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
