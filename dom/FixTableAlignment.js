const Plugin = require('../lib/Plugin');

class FixTableAlignment extends Plugin {

    async postprocess({ $ }) {
        $('table').each((i, el) => {
            if(!el.getAttribute('align')) {
                if(el.style.marginLeft === 'auto' && el.style.marginRight === 'auto') {
                    el.setAttribute('align', 'center');
                }
                else if(el.style.marginLeft === 'auto') {
                    el.setAttribute('align', 'right');
                }
                else if(el.style.marginRight === 'auto') {
                    el.setAttribute('align', 'left');
                }
            }
        });
    }
}

module.exports = FixTableAlignment;