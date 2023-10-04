import { AnyNode, Cheerio } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';

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

        if(!href) {
            return;
        }
        
        $el.attr('href', replaceQueryString($el.attr('href'), this.options));    
    }
    
}