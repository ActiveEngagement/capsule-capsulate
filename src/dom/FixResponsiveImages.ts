import { CheerioAPI } from 'cheerio';
import * as units from 'units-css';
import BaseDomPlugin from '../DomPlugin';

export type FixResponsiveImagesOptions = {
    maxWidth: number
}

export default class FixResponsiveImages extends BaseDomPlugin<FixResponsiveImagesOptions> {

    defaultOptions() {
        return {
            maxWidth: 600
        };
    }

    async postprocess($: CheerioAPI) {
        for(const el of $('img')) {
            const $el = $(el);

            if($el.attr('width') || !$el.css('width')) {
                continue;
            }

            try {
                const { unit, value } = units.parse(
                    $el.css('width').replace('!important', '').trim() ?? 0
                );

                if(unit === '%') {
                    $el.attr('width', String(this.options.maxWidth * (100 / value)));
                }
                else if(value) {
                    $el.attr('width', units.convert('px', `${value}${unit || 'px'}`));
                }
                    
                if(!$el.css('width') && $el.attr('width')) {
                    $el.css('width', `${$el.attr('width')}px`);
                }
            }
            catch(e) {
                // do nothing after the error
            }
        }

        return $;
    }

}