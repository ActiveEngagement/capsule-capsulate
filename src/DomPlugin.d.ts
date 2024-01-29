import { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
export interface DomPlugin {
    initialize(src: string): Promise<string>;
    preprocess($: CheerioAPI): Promise<CheerioAPI>;
    process($el: Cheerio<AnyNode>, $: CheerioAPI): Promise<void>;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
    transform(src: string): Promise<string>;
}
export class BaseDomPlugin<T extends object = object> implements DomPlugin {
    protected options: T;
    constructor(options?: T);
    defaultOptions(): T;
    initialize(src: string): Promise<string>;
    preprocess($: CheerioAPI): Promise<CheerioAPI>;
    process(_$el: Cheerio<AnyNode>, _$: CheerioAPI): Promise<void>;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
    transform(src: string): Promise<string>;
}
