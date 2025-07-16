import { CheerioAPI } from 'cheerio';
import { defaultsDeep } from 'lodash-es';
import type { MaybeOption } from './capsulate';

export interface Plugin {
    
    enabled: boolean;

    initialize(src: string): Promise<string>

    preprocess($: CheerioAPI): Promise<CheerioAPI>

    process($: CheerioAPI): Promise<CheerioAPI>

    postprocess($: CheerioAPI): Promise<CheerioAPI>

    transform(src: string): Promise<string>
    
};

export abstract class BasePlugin<T extends object = object> implements Plugin {

    public enabled: boolean = true;

    protected options: T;

    constructor(options?: MaybeOption<T>) {
        if(options === false) {
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