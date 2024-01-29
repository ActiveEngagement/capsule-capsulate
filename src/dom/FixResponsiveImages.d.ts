import { CheerioAPI } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export type FixResponsiveImagesOptions = {
    maxWidth: number;
};
export class FixResponsiveImages extends BaseDomPlugin<FixResponsiveImagesOptions> {
    defaultOptions(): {
        maxWidth: number;
    };
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
