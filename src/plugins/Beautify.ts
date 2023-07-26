import { html_beautify, HTMLBeautifyOptions } from "js-beautify";
import BasePlugin from '../Plugin';

export default class Beautify extends BasePlugin<HTMLBeautifyOptions> {

    defaultOptions(): HTMLBeautifyOptions {
        // More options can be found here:
        // https://www.npmjs.com/package/js-beautify
        return {
            indent_size: 4,
            indent_char: ' ',
            indent_inner_html: true,
            max_preserve_newlines: 0,
            preserve_newlines: false,
            indent_scripts: 'separate',
            end_with_newline: true,
            wrap_line_length: 0,
            indent_empty_lines: false
        };
    }

    async transform(src) {
        return html_beautify(src, this.options);
    }

};