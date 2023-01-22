const beautify = require('js-beautify').html;
const Plugin = require('../lib/Plugin');

module.exports = class HtmlMinifier extends Plugin {

    defaultOptions() {
        // More options can be found here:
        // https://www.npmjs.com/package/html-minifier
        return {
            indent_size: '4',
            indent_char: ' ',
            max_preserve_newlines: '0',
            preserve_newlines: true,
            keep_array_indentation: false,
            break_chained_methods: false,
            indent_scripts: 'separate',
            brace_style: 'collapse',
            space_before_conditional: false,
            unescape_strings: false,
            jslint_happy: false,
            end_with_newline: false,
            wrap_line_length: '0',
            indent_inner_html: true,
            comma_first: false,
            e4x: false,
            indent_empty_lines: false
        };
    }

    async transform(src) {
        return beautify(src, this.options);
    }

};