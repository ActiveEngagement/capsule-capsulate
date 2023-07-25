import { AnyNode, Cheerio, CheerioAPI } from "cheerio"

export interface DomPlugin {
    
    initialize(src: string): Promise<string>

    preprocess($: CheerioAPI): Promise<CheerioAPI>

    process($el: Cheerio<AnyNode>, $: CheerioAPI): Promise<void>

    postprocess($: CheerioAPI): Promise<CheerioAPI>

    transform(src: string): Promise<string>
    
};

export default class BaseDomPlugin<T extends object = object> implements DomPlugin {

    protected options: T;

    constructor(options?: T) {
        this.options = Object.assign({}, this.defaultOptions(), options ?? {} as T);
    }

    defaultOptions(): T {
        return;
    }

    async initialize(src: string): Promise<string> {
        return src;
    }

    async preprocess($: CheerioAPI) {
        return Promise.resolve($);
    }

    async process($el: Cheerio<AnyNode>, $: CheerioAPI) {
        //
    }

    async postprocess($: CheerioAPI) {
        return Promise.resolve($);
    }

    async transform(src: string): Promise<string> {
        return src;
    }

}