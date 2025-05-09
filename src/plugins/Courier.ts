import type { CheerioAPI } from 'cheerio';
import { BasePlugin } from '../Plugin';

export type CourierOptions = {
    requestId?: string|null;
}

export class Courier extends BasePlugin<CourierOptions> {

    defaultOptions() {
        return {
            requestId: undefined
        };
    }

    async postprocess($: CheerioAPI) {
        if(!this.options.requestId) {
            return Promise.resolve($);
        }

        const head = $('head');
        const meta = $(`<meta name="courier-request-id" value="${this.options.requestId}"/>`);

        if(head.length) {
            head.append(meta);
        }
        else {
            $.root().prepend(meta);
        }
        
        return Promise.resolve($);
    }

};