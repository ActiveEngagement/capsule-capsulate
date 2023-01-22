const Plugin = require('../lib/Plugin');

module.exports = class PreserveBodyAttributes extends Plugin {

    constructor(options) {
        super(undefined, options);
    }

    async process({ $ }) {
        this.attrs = $('body').attrs();
    }

    async postprocess({ $ }) {
        $('body').attr(this.attrs);
    }

};