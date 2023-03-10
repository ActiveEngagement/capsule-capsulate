const jQuery = require('../lib/jquery');
const pickBy = require('lodash.pickby');
const Plugin = require('../lib/Plugin');
const size = require('lodash/size');

class FixMsoButtons extends Plugin {

    async postprocess({ $ }) {
        $('a, button').each((i, el) => {
            // Ignore if the element has children
            if(el.children.length) {
                return;
            }

            // Ignore if the display isn't block or inline-block
            if(el.style.display !== 'block' &&
               el.style.display !== 'inline-block') {
                return;
            }
            
            // Ignore if the element already has an MSO
            if($(el).mso()) {
                return;
            }
        
            const styles = $(el).styles();

            delete styles.display;

            const $table = jQuery('<table />')('table')
                .css('display', `${el.style.display || 'inline'} !important`)
                .attr({
                    border: 0,
                    cellpadding: 0,
                    cellspacing: 0
                });

            const $td = $('<td />')
                .appendTo($('<tr />').appendTo($table))
                .css(styles)
                .attr(pickBy({
                    color: el.style.color,
                    border: el.style.borderWidth,
                    bgcolor: el.style.backgroundColor,
                    borderColor: el.style.borderColor,
                }));

            // Ignore if there are no styles to mimic
            if(!size($td.attrs())) {
                return;
            }
            
            const matches = $table.get(0).outerHTML.match(/(.+?)(<\/.+)/);

            el.insertAdjacentHTML('afterbegin', `<!--[if mso]>${matches[1]}<![endif]-->`);
            el.insertAdjacentHTML('beforeend', `<!--[if mso]>${matches[2]}<![endif]-->`);
        });
    }

}

module.exports = FixMsoButtons;