import { AnyNode, Cheerio } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
import { escapeRegExp, extractMsoCommentNodes, extractUrlsFromMsoCommentNode, replaceQueryString, type SourceCodeReplacement } from '../helpers';

export type ReplaceQueryStringOptions = {
    sourceCodes: SourceCodeReplacement[]
};

export class ReplaceQueryStrings extends BaseDomPlugin<ReplaceQueryStringOptions> {

    defaultOptions(): ReplaceQueryStringOptions {
        return {
            sourceCodes: [] 
        };
    }

    async process($el: Cheerio<AnyNode>) {
        const href = $el.attr('href');

        if(href) {
            $el.attr('href', replaceQueryString(href, this.options.sourceCodes));
        }        
    
        const nodes = extractMsoCommentNodes($el);

        for(const node of nodes) {
            // MSO buttons repeat the same URL on both the hidden <a> and the
            // <v:roundrect>, and one URL may be a prefix of another. Replace
            // every occurrence of each unique URL in one pass, anchored to the
            // attribute boundary that follows it (quote/whitespace/`>`), so a
            // URL never re-matches as a prefix of an already-rewritten one.
            const urls = new Set(extractUrlsFromMsoCommentNode(node));

            for(const url of urls) {
                const pattern = new RegExp(escapeRegExp(url) + '(?=["\'\\s<>])', 'g');

                node.data = node.data.replace(pattern, replaceQueryString(url, this.options.sourceCodes));
            }
        }
    }
    
}