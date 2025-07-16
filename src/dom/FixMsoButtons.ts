import { CheerioAPI } from 'cheerio';
import { pickBy } from 'lodash-es';
import { BaseDomPlugin } from '../DomPlugin';

export class FixMsoButtons extends BaseDomPlugin {

    async postprocess($: CheerioAPI) {     
        for(const el of $('a,button')) {
            const $el = $(el);

            // Ignore if the element has children
            // @todo - Needs refactored to check if the only node is a text node.
            if(el.children.length !== 1 || el.children[0].type !== 'text') {
                continue;
            }

            // Ignore if the display isn't block or inline-block
            if(!['block', 'inline-block'].includes($el.css('display') ?? '')) {
                continue;
            }

            // Ignore if the element already has an MSO
            if($(el).mso()) {
                continue;
            }

            const styles = $el.css();

            const $dom = $('<template/>').append('<table><td/></table>');
            
            const $table = $dom.find('table');

            $table.css('display', `${$el.css('display') || 'inline'} !important`);
            $table.attr({
                border: '0',
                cellpadding: '0',
                cellspacing: '0'
            });
            
            const $td = $table.find('td');

            if(styles) {
                delete styles.display;

                $td.css(styles);
            }
            
            $td.attr(pickBy({
                color: $el.css('color'),
                border: $el.css('border-width'),
                bgcolor: $el.css('background-color') || $el.css('background'),
                borderColor: $el.css('border-color'),
            }) as Record<string,string>);

            if(!Object.keys($td.css() ?? {}).length) {
                continue;
            }

            const matches = $dom.html()?.match(/(.+?)(<\/.+)/);
            
            if(matches) {
                $el.prepend(`<!--[if mso]>${matches[1].replace('<tbody>', '')}<![endif]-->`);
                $el.append(`<!--[if mso]>${matches[2].replace('</tbody>', '')}<![endif]-->`);
            }
        }
        
        return $;
    }

}
