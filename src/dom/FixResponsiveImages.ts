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

            if($el.attr('width')) {
                continue;
            }

            const { unit, value } = units.parse($el.css('width'));

            if(unit === '%') {
                $el.attr('width', String(this.options.maxWidth * (100 / value)));
            }
            else if($el.css('width')) {
                $el.attr('width', units.convert('px', `${value}${unit || 'px'}`));
            }
                
            if(!$el.css('width')) {
                $el.css('width', `${$el.attr('width')}px`);
            }
        }

        // $('img').each((i, el) => { 
        //     const $el = $(el);

        //     if(!$el.attr('width')) {
        //         const width = getComputedStyle(el, '').width;
        //         const { unit, value } = parse(width);

        //         if(unit === '%') {
        //             $el.attr('width', this.options.maxWidth * (100 / value));
        //         }
        //         else if(width) {
        //             $el.attr('width', convert('px', `${value}${unit || 'px'}`, el));
        //         }
        //     }
        //     else if(!$el.css('width')) {
        //         $el.css('width', `${$el.attr('width')}px`);
        //     }
        // });

        /*
        Replaced: 
        document.querySelectorAll('img').forEach(el => {        
            if(!el.getAttribute('width')) {
                const widthSuffix = suffix(el.style.width);

                if(widthSuffix === '%') {
                    el.setAttribute('width', maxWidth * (100 / convertUnitToFloat(el.style.width)));
                }
                else if(widthSuffix === 'px') {
                    el.setAttribute('width', Math.min(maxWidth, convertUnitToFloat(el.style.width)));
                }
            }
            else if(!el.style.width) {
                el.style.width = unit(el.getAttribute('width'));
            }
        });
        */

        return $;
    }

}