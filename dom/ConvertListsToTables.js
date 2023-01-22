const jQuery = require('../lib/jquery');
const Plugin = require('../lib/Plugin');
const beautify = require('js-beautify').html;

class ConvertListsToTables extends Plugin {

    defaultOptions() {
        return {
            symbol: '&bull;'
        };
    }
    
    async postprocess({ $, window: { document }}) {
        document.querySelectorAll('ol, ul').forEach(el => {
            const $doc = jQuery('<table border="0" cellspacing="0" cellpadding="0" />');

            const $table = $doc('table').append('<tbody />');

            for(let i = 0; i < el.attributes.length; i++) {
                $table.attr(el.attributes[i].name, el.attributes[i].value);
            }
            
            $table.addClass(el.tagName.toLowerCase());

            el.querySelectorAll('li').forEach((child, i) => {
                const $tr = $('<tr />').appendTo($table.find('tbody'));
                
                $(`<td valign="top" style="padding-bottom: 1em" />`)
                    .append(`<div>&nbsp;&nbsp;&nbsp;&nbsp;${ el.tagName === 'OL' ? (i + 1) + '.' : this.options.symbol }&nbsp;&nbsp;</div>`)
                    .appendTo($tr);

                const style = Array.from(child.style)
                    .reduce((carry, attr) => Object.assign(carry, {
                        [attr]: child.style[attr]
                    }), {});
                
                $('<td valign="top" style="padding-bottom: 1em" />')
                    .css(style)
                    .html(child.innerHTML)
                    .appendTo($tr);

            });

            el.insertAdjacentHTML('afterend', beautify($table.get(0).outerHTML, {
                braceStyle: 'expand'
            }));
            
            el.parentNode.removeChild(el);
        });
    }

}

module.exports = ConvertListsToTables;