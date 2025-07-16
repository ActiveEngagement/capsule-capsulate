import { AnyNode, Cheerio } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
import { extractMsoCommentNodes, extractUrlsFromMsoCommentNode, replaceQueryString, type SourceCodeReplacement } from '../helpers';

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
            const urls = extractUrlsFromMsoCommentNode(node);

            for(const url of urls) {
                node.data = node.data.replace(url, replaceQueryString(url, this.options.sourceCodes));
            }
        }
    }
    
}