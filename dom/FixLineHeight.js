const Plugin = require('../lib/Plugin');

module.exports = class FixLineHeight extends Plugin {

    async process(el) {
        const style = el.getAttribute('style');
    
        if(el.style.lineHeight && !style.match('mso-line-height-rule')) {
            el.setAttribute('style', (
                style ? style.replace(/(.*);$/,'$1') + ';' : ''
            ) + 'mso-line-height-rule: exactly;');
        }
    }

};