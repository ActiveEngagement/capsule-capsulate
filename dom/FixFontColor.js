const Plugin = require('../lib/Plugin');

module.exports = class FixFontColor extends Plugin {

    async process(el) {
        if(el.style.color) {
            el.setAttribute('color', el.style.color);
        }
    }

};