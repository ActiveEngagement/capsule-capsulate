const jQuery = require('../lib/jquery');
const size = require('lodash.size');
const pickBy = require('lodash.pickby');
const Plugin = require('../lib/Plugin');

module.exports = class FixMsoWrapper extends Plugin {

    async postprocess({ $ }) {
        $('div').each((i, el) => {
            if($(el).mso()) {
                return;
            }

            const float = $(el).float();
            const width = $(el).width();
            const height = $(el).height();

            const $table = jQuery('<table />')('table').attr({
                align: float,
                width: width,
                border: (float || width) ? 0 : null,
                cellpadding: (float || width) ? 0 : null,
                cellspacing: (float || width) ? 0 : null
            });
    
            $table.append('<tr><td></td></tr>');
    
            const $td = $table
                .find('td')
                .attr('height', height)
                .css({
                    margin: $(el).css('margin'),
                    padding: $(el).css('padding')
                });

            if((size($table.attrs()) || size($td.attrs())) > 0) {
                const matches = $table.get(0).outerHTML.match(/(.+?)(<\/.+)/);
    
                el.insertAdjacentHTML('beforebegin', `<!--[if mso]>${matches[1]}<![endif]-->\n`);
                el.insertAdjacentHTML('afterend', `\n<!--[if mso]>${matches[2]}<![endif]-->`);
            }
        });
    }

};