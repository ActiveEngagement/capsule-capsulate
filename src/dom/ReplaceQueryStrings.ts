import { AnyNode, Cheerio } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';
import { extractMsoCommentNodes, extractUrlsFromMsoCommentNode } from '../helpers';

export type SourceCode = {
    key: string,
    from: string,
    to: string
}

export type ReplaceQueryStringOptions = SourceCode[];

export function replaceQueryString(href: string, replacements: SourceCode[]) {            
    const url = new URL(href);

    for(const { key, from, to } of replacements) {
        if(url.searchParams.get(key) === from) {
            url.searchParams.set(key, to);
        }
    }

    return url.toString();
}

export default class ReplaceQueryStrings extends BaseDomPlugin<ReplaceQueryStringOptions> {

    defaultOptions(): ReplaceQueryStringOptions {
        return [];
    }

    async process($el: Cheerio<AnyNode>) {
        const href = $el.attr('href');

        if(href) {
            $el.attr('href', replaceQueryString($el.attr('href'), this.options));
        }        
    
        const nodes = extractMsoCommentNodes($el);

        for(const node of nodes) {
            const urls = extractUrlsFromMsoCommentNode(node);

            for(const url of urls) {
                node.data = node.data.replace(url, replaceQueryString(url, this.options));
            }
        }
    }
    
}