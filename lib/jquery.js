const jsdom = require('./jsdom');

module.exports = function(src, options) {
    return jsdom(src, options).$;
};