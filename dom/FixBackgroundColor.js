const Plugin = require('../lib/Plugin');

class FixBackgroundColor extends Plugin {

    async process(el) {
        if(el.style.backgroundColor) {
            el.setAttribute('bgcolor', el.style.backgroundColor);
        }
    }

}

module.exports = FixBackgroundColor;