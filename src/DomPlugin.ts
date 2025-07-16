import { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { defaultsDeep } from 'lodash-es';
import type { MaybeOption } from './capsulate';

export interface DomPlugin {
    
    enabled: boolean;

    initialize(src: string): Promise<string>

    preprocess($: CheerioAPI): Promise<CheerioAPI>

    process($el: Cheerio<AnyNode>, $: CheerioAPI): Promise<void>

    postprocess($: CheerioAPI): Promise<CheerioAPI>

    transform(src: string): Promise<string>
    
};

export class BaseDomPlugin<T extends object = object> implements DomPlugin {

    public enabled: boolean = true;

    protected options: T;

    constructor(options?: MaybeOption<T>) {
        if(options == false) {
            this.enabled = false;
        }
        
        this.options = defaultsDeep({}, this.defaultOptions(), options);
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