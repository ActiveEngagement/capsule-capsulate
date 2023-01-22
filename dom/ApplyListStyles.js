const Plugin = require('../lib/Plugin');

module.exports = class ApplyListStyles extends Plugin {

    async postprocess({ $ }) {
        $('ul, ol').each((i, el) => {
            if(!el.getAttribute('align')) {
                el.setAttribute('align', 'left');
            }

            if(!el.getAttribute('type')) {
                el.setAttribute('type', el.tagName === 'OL' ? '1' : 'disc');
            }

            if(!el.style.padding) {
                el.style.padding = 0;
            }
            
            if(!el.style.margin) {
                el.style.margin = 0;
                el.style.marginLeft = '25px';
            }
        });
    }

};