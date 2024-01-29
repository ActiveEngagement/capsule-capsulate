import { AnyNode, Cheerio, CheerioAPI } from 'cheerio';

export interface DomPlugin {
    
    initialize(src: string): Promise<string>

    preprocess($: CheerioAPI): Promise<CheerioAPI>

    process($el: Cheerio<AnyNode>, $: CheerioAPI): Promise<void>

    postprocess($: CheerioAPI): Promise<CheerioAPI>

    transform(src: string): Promise<string>
    
};

export class BaseDomPlugin<T extends object = object> implements DomPlugin {

    protected options: T;

    constructor(options?: T) {
        const defaultOptions = this.defaultOptions();

        if(Array.isArray(options) || Array.isArray(defaultOptions)) {
            this.options = options ?? this.defaultOptions();
        }
        else {
            this.options = Object.assign(
                {}, defaultOptions, options ?? {} as T
            );
        }
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

    async process(_$el: Cheerio<AnyNode>, _$: CheerioAPI) {
        //
    }

    async postprocess($: CheerioAPI) {
        return Promise.resolve($);
    }

    async transform(src: string): Promise<string> {
        return src;
    }

}