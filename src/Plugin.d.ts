import { CheerioAPI } from 'cheerio';
export interface Plugin {
    initialize(src: string): Promise<string>;
    preprocess($: CheerioAPI): Promise<CheerioAPI>;
    process($: CheerioAPI): Promise<CheerioAPI>;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
    transform(src: string): Promise<string>;
}
export abstract class BasePlugin<T extends object = object> implements Plugin {
    protected options: T;
    constructor(options?: T);
    defaultOptions(): T;
    initialize(src: string): Promise<string>;
    preprocess($: CheerioAPI): Promise<CheerioAPI>;
    process($: CheerioAPI): Promise<CheerioAPI>;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
    transform(src: string): Promise<string>;
}
