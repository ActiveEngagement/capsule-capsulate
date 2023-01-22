const { getComputedStyle } = require('../lib/convert/utilities');
const { convert, parse } = require('../lib/convert/index');

// const unit = require('../lib/unit');
// const suffix = require('../lib/suffix');

const Plugin = require('../lib/Plugin');

// const convertUnitToFloat = require('../lib/convertUnitToFloat');

class FixResponsiveImages extends Plugin {

    defaultOptions() {
        return {
            maxWidth: 600
        };
    }

    async postprocess({ $ }) {
        $('img').each((i, el) => { 
            const $el = $(el);

            if(!$el.attr('width')) {
                const width = getComputedStyle(el, '').width;
                const { unit, value } = parse(width);

                if(unit === '%') {
                    $el.attr('width', this.options.maxWidth * (100 / value));
                }
                else if(width) {
                    $el.attr('width', convert('px', `${value}${unit || 'px'}`, el));
                }
            }
            else if(!$el.css('width')) {
                $el.css('width', `${$el.attr('width')}px`);
            }
        });

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
    }

}

module.exports = FixResponsiveImages;