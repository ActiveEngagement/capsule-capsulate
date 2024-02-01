import { type Cheerio, type CheerioAPI, type Element } from 'cheerio';
import pickBy from 'lodash.pickby';
// @ts-ignore
import * as units from 'units-css';
import { BaseDomPlugin } from '../DomPlugin';

export class FixMsoWrapper extends BaseDomPlugin {

    async postprocess($: CheerioAPI) {
        $('div').each((_, el) => {
            const $el = $(el);

            if(!this.shouldWrapWithMso($el)) {
                return;
            }

            const float = $(el).float();
            const width = $(el).width();
            const height = $(el).height();

            const $table = $('<template/>').append('<table><tr><td /></tr></table>');

            $table.find('table').attr(pickBy({
                align: float,
                width: width,
                border: (float || width) ? '0' : undefined,
                cellpadding: (float || width) ? '0' : undefined,
                cellspacing: (float || width) ? '0' : undefined
            }) as Record<string,string>);
    
            const $td = $table.find('td');
            
            $td.attr('height', height).css(pickBy({
                margin: $(el).css('margin'),
                padding: $(el).css('padding')
            }) as Record<string,string>);

            if(Object.keys($table.find('table').attr() ?? {}).length || Object.keys($td.attr() ?? {}).length > 0) {
                const matches = $($table).html()?.match(/(.+?)(<\/.+)/);
    
                if(matches) {
                    $(`<!--[if mso]>${matches[1].replace('<tbody>', '')}<![endif]-->\n`).insertBefore(el);
                    $(`\n<!--[if mso]>${matches[2].replace('</tbody>', '')}<![endif]-->`).insertAfter(el);
                }
            }
        });

        return $;
    }

    shouldWrapWithMso($el: Cheerio<Element>) {
        // If the element already has an mso wrapper, do not wrap.
        if($el.mso()) {
            return false;
        }

        // If the element has a width, height, or float, it should be wrapped.
        if($el.width() || $el.float()) {
            return true;
        }
        
        if($el.margin() && units.parse($el.margin()?.replace(/(\s+)?\!important/, '')).value !== 0) {
            return true;
        }

        if($el.padding() && units.parse($el.padding()?.replace(/(\s+)?\!important/, '')).value !== 0) {
            return true;
        }
        
        // if(unit$el.margin() || $el.padding())
        
        return false;
    }

    // hasCssProperty($el: Cheerio<Element>, prop: string) {
    //     const expanded = expand(prop, $el.css(prop));

    //     if(Array.isArray(expanded)) {
    //         return false;
    //     }

    //     for(const [, value] of Object.entries(expanded)) {
    //         if(value !== '0') {
    //             return true;
    //         }
    //     }

    //     return false;
    // }
};