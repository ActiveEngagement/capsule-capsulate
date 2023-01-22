module.exports = class Plugin {
    
    constructor(options) {
        this.options = Object.assign(this.defaultOptions(), options);
    }

    defaultOptions() {
        return {
            //
        };
    }

    async initialize(src) {
        return src;
    }

    async process(src) {
        //
    }

    async preprocess(src) {
        //
    }

    async postprocess(src) {
        //
    }

    async transform(src) {
        return src;
    }
    
};