const { JSDOM } = require('jsdom');

module.exports = function(src, options) {
    const dom = !(src instanceof JSDOM) ? new JSDOM(src, options) : src;

    if(!dom.$) {
        dom.$ = require('jquery')(dom.window);
        dom.$.fn.attrs = require('./$/attrs');
        dom.$.fn.float = require('./$/float');
        dom.$.fn.height = require('./$/height');
        dom.$.fn.mso = require('./$/mso').mso;
        dom.$.fn.styles = require('./$/styles');
        dom.$.fn.width = require('./$/width');
    }

    return dom;
};