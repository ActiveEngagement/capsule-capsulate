import { CheerioAPI } from 'cheerio';
import { html_beautify } from 'js-beautify';
import BaseDomPlugin from '../DomPlugin';

export type ConvertListsToTablesOptions = {
    symbol: string
}

export default class ConvertListsToTables extends BaseDomPlugin<ConvertListsToTablesOptions> {

    defaultOptions(): ConvertListsToTablesOptions {
        return {
            symbol: '&bull;'
        };
    }
    
    async postprocess($: CheerioAPI) {
        for(const el of $('ol,ul')) {
            const $el = $(el), $table = $('<table border="0" cellspacing="0" cellpadding="0"><tbody/></table>');
            
            const attr = $el.attr();

            if(attr) {
                $table.first().attr(attr);
            }
            
            $table.first().addClass(el.tagName);

            let i = 0;

            for(const child of $el.find('li')) {
                const $tr = $('<tr />').appendTo($table.find('tbody'));

                $('<td valign="top" style="padding-bottom: 1em" />')
                    .append(`<div>&nbsp;&nbsp;&nbsp;&nbsp;${ el.tagName === 'ol' ? (i + 1) + '.' : this.options.symbol }&nbsp;&nbsp;</div>`)
                    .appendTo($tr);

                $('<td valign="top" style="padding-bottom: 1em" />')
                    .css($(child).css() ?? {})
                    .html($(child).html() ?? '')
                    .appendTo($tr);

                i++;
            }

            $(html_beautify($.html($table))).insertAfter($el);

            $el.remove();
        }

        // document.querySelectorAll('ol, ul').forEach(el => {
        //     const $doc = jQuery('<table border="0" cellspacing="0" cellpadding="0" />');

        //     const $table = $doc('table').append('<tbody />');

        //     for(let i = 0; i < el.attributes.length; i++) {
        //         $table.attr(el.attributes[i].name, el.attributes[i].value);
        //     }
            
        //     $table.addClass(el.tagName.toLowerCase());

        //     el.querySelectorAll('li').forEach((child, i) => {
        //         const $tr = $('<tr />').appendTo($table.find('tbody'));
                
        //         $(`<td valign="top" style="padding-bottom: 1em" />`)
        //             .append(`<div>&nbsp;&nbsp;&nbsp;&nbsp;${ el.tagName === 'OL' ? (i + 1) + '.' : this.options.symbol }&nbsp;&nbsp;</div>`)
        //             .appendTo($tr);

        //         const style = Array.from(child.style)
        //             .reduce((carry, attr) => Object.assign(carry, {
        //                 [attr]: child.style[attr]
        //             }), {});
                
        //         $('<td valign="top" style="padding-bottom: 1em" />')
        //             .css(style)
        //             .html(child.innerHTML)
        //             .appendTo($tr);

        //     });

        //     el.insertAdjacentHTML('afterend', beautify($table.get(0).outerHTML, {
        //         braceStyle: 'expand'
        //     }));
            
        //     el.parentNode.removeChild(el);
        // });

        return $;
    }

}