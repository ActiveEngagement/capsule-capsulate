const Plugin = require('../lib/Plugin');

class RemoveDisplayNone extends Plugin {

    constructor(options) {
        super(options);

        this.nodes = [];
    }

    async process(el) {
        if(el.style.display === 'none') {
            this.nodes.push(el);
        }
    }

    async postprocess() {
        this.nodes.forEach(el => el.remove());
    }

}

module.exports = RemoveDisplayNone;