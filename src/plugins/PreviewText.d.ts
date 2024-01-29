import { Cheerio, CheerioAPI, Element } from 'cheerio';
import { BasePlugin } from '../Plugin';
export type PreviewTextOptions = {
    html?: string | (($: CheerioAPI) => PreviewTextHtml);
};
export type PreviewTextHtml = Cheerio<Element> | string | undefined | null;
export class PreviewText extends BasePlugin<PreviewTextOptions> {
    protected html: string | undefined;
    preprocess($: CheerioAPI): Promise<CheerioAPI>;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
