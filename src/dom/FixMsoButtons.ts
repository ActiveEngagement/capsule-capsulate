import { CheerioAPI } from 'cheerio';
import pickBy from 'lodash.pickby';
import BaseDomPlugin from '../DomPlugin';

// const jQuery = require('../lib/jquery');
// const pickBy = require('lodash.pickby');
// const Plugin = require('../lib/Plugin');
// const size = require('lodash/size');

export default class FixMsoButtons extends BaseDomPlugin {

    async postprocess($: CheerioAPI) {     
        for(const el of $('a,button')) {
            const $el = $(el);

            // Ignore if the element has children
            // @todo - Needs refactored to check if the only node is a text node.
            if(el.children.length !== 1 || el.children[0].type !== 'text') {
                continue;
            }

            // Ignore if the display isn't block or inline-block
            if(!['block', 'inline-block'].includes($el.css('display'))) {
                continue;
            }

            // Ignore if the element already has an MSO
            if($(el).mso()) {
                continue;
            }

            const styles = $el.css();

            const $dom = $('<template/>').append('<table><td/></table>');
            
            const $table = $dom.find('table');

            $table.css('display', `${$el.css('display') || 'inline'} !important`)
            $table.attr({
                border: '0',
                cellpadding: '0',
                cellspacing: '0'
            })
            
            const $td = $table.find('td');

            delete styles.display;

            $td.css(styles)
            $td.attr(pickBy({
                color: $el.css('color'),
                border: $el.css('border-width'),
                bgcolor: $el.css('background-color') || $el.css('background'),
                borderColor: $el.css('border-color'),
            }))

            if(!Object.keys($td.css()).length) {
                continue;
            }

            const matches = $dom.html().match(/(.+?)(<\/.+)/);
            
            $el.prepend(`<!--[if mso]>${matches[1].replace('<tbody>', '')}<![endif]-->`);
            $el.append(`<!--[if mso]>${matches[2].replace('</tbody>', '')}<![endif]-->`);
        }
        
        // $('a, button').each((i, el) => {
        //     // Ignore if the element has children
        //     if(el.children.length) {
        //         return;
        //     }

        //     // Ignore if the display isn't block or inline-block
        //     if(el.style.display !== 'block' &&
        //        el.style.display !== 'inline-block') {
        //         return;
        //     }
            
        //     // Ignore if the element already has an MSO
        //     if($(el).mso()) {
        //         return;
        //     }
        
        //     const styles = el.style;

        //     delete styles.display;

        //     const $table = jQuery('<table />')('table')
        //         .css('display', `${el.style.display || 'inline'} !important`)
        //         .attr({
        //             border: 0,
        //             cellpadding: 0,
        //             cellspacing: 0
        //         });

        //     const $td = $('<td />')
        //         .appendTo($('<tr />').appendTo($table))
        //         .css(styles)
        //         .attr(pickBy({
        //             color: el.style.color,
        //             border: el.style.borderWidth,
        //             bgcolor: el.style.backgroundColor,
        //             borderColor: el.style.borderColor,
        //         }));

        //     // Ignore if there are no styles to mimic
        //     if(!size($td.attr())) {
        //         return;
        //     }
            
        //     const matches = $table.get(0).outerHTML.match(/(.+?)(<\/.+)/);

        //     el.insertAdjacentHTML('afterbegin', `<!--[if mso]>${matches[1]}<![endif]-->`);
        //     el.insertAdjacentHTML('beforeend', `<!--[if mso]>${matches[2]}<![endif]-->`);
        // });

        return $;
    }

}
