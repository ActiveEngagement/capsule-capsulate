import { AnyNode, Cheerio } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
import { extractMsoCommentNodes, extractUrlsFromMsoCommentNode } from '../helpers';

export type SourceCode = {
    key: string,
    from: string,
    to: string,
    count?: number
}

export type ReplaceQueryStringOptions = SourceCode[];

export function replaceQueryString(href: string, replacements: SourceCode[]) {
    let url: URL;
    
    try {
        url = new URL(href);
    }
    catch (e) {
        return href;
    }

    for(const { key, from, to } of replacements) {
        if(url.searchParams.get(key) === from) {
            url.searchParams.set(key, to.replace(/\s/g, '%20'));            
        }
    }

    if(!url.searchParams.size) {
        return url.toString();
    }

    const rawQueryString = '?' + [...url.searchParams.entries()].map(([key, value]) => {
        return `${key}=${value}`;
    }).join('&');

    return url.toString().replace(url.search, rawQueryString);
}

export class ReplaceQueryStrings extends BaseDomPlugin<ReplaceQueryStringOptions> {

    defaultOptions(): ReplaceQueryStringOptions {
        return [];
    }

    async process($el: Cheerio<AnyNode>) {
        const href = $el.attr('href');

        if(href) {
            $el.attr('href', replaceQueryString(href, this.options));
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