import { CheerioAPI } from 'cheerio';

export interface Plugin {
    
    initialize(src: string): Promise<string>

    preprocess($: CheerioAPI): Promise<CheerioAPI>

    process($: CheerioAPI): Promise<CheerioAPI>

    postprocess($: CheerioAPI): Promise<CheerioAPI>

    transform(src: string): Promise<string>
    
};

export abstract class BasePlugin<T extends object = object> implements Plugin {

    protected options: T;

    constructor(options?: T) {
        this.options = Object.assign({}, this.defaultOptions(), options ?? {} as T);
    }

    defaultOptions(): T {
        return {} as T;
    }

    async initialize(src: string): Promise<string> {
        return src;
    }

    async preprocess($: CheerioAPI) {
        return Promise.resolve($);
    }

    async process($: CheerioAPI) {
        return Promise.resolve($);
    }

    async postprocess($: CheerioAPI) {
        return Promise.resolve($);
    }

    async transform(src: string): Promise<string> {
        return src;
    }

}