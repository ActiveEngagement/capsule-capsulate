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

        if($('head').length) {
            $('head').append(`<meta name="courier-request-id" value="${this.options.requestId}"/>`);
        }
        
        const div = $(`<div data-courier-request-id="${this.options.requestId}" style="display:none;font-size:0;line-height:0;">&nbsp;</div>`);

        if($('body').length) {
            $('body').append(div);
        }
        else {
            $.root().append(div);
        }

        return Promise.resolve($);
    }

};