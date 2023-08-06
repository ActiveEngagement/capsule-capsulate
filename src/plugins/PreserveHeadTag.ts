import { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import BasePlugin from '../Plugin';
import { cheerio, isFragment } from '../helpers';

export default class PreserveHeadTag extends BasePlugin {

    protected head: Cheerio<AnyNode>;

    async preprocess($: CheerioAPI) {
        this.head = $('head');

        return $;
    }

    async postprocess($: CheerioAPI) {
        if(!this.head.length) {
            return $;
        }
        
        // If the current document is a fragment, we a need a place to append
        // the head tag. Create an html document and append the head and body.
        if(isFragment($.html())) {
            const doc = cheerio('<html/>');

            doc('head').replaceWith(this.head);
            doc('body').append($.root().children());

            return doc;
        }

        // If the head tag doesn't exist create one.
        if(!$('head').length) {
            $('html').prepend(this.head);
        }
        // Otherwise merge the head tags together.
        else {
            $('head').append(this.head.html());
        }

        return $;
    }

};