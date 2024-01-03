import { CheerioAPI } from 'cheerio';
import nunjucks from 'nunjucks';
import BasePlugin from '../Plugin';
export type TemplateOptions = {
    data?: object;
    src?: string | null;
    nunjucks?: nunjucks.ConfigureOptions;
};
export default class Template extends BasePlugin<TemplateOptions> {
    defaultOptions(): {
        data: {};
        src: undefined;
        nunjucks: {
            autoescape: boolean;
        };
    };
    initialize(src: string): Promise<string>;
    process($: CheerioAPI): Promise<CheerioAPI>;
    compile(src: string, data?: object): string;
}
