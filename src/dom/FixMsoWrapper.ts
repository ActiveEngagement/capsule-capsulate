import { CheerioAPI } from 'cheerio';
import pickBy from 'lodash.pickby';
import BaseDomPlugin from '../DomPlugin';

export default class FixMsoWrapper extends BaseDomPlugin {

    async postprocess($: CheerioAPI) {
        $('div').each((_, el) => {
            const $el = $(el);

            if($el.mso()) {
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

};