const Plugin = require('../lib/Plugin');
const { decode } = require('html-entities');

module.exports = class DecodeHrefAmpersands extends Plugin {

    async transform(src) {
        const matches = src.match(/(?<attr>href=(?<quote>["']).*?\2)/gm);

        for(let match of matches) {
            src = src.replace(match, match.replace(/&amp;/g, '&', match));
        }

        return src;
    }

};