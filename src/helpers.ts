import { parse } from 'capsule-lint';
import { Cheerio, CheerioAPI, load, type AnyNode, type BasicAcceptedElems, type CheerioOptions } from 'cheerio';
import { Comment } from 'domhandler';
import { computed, ref } from 'vue';
import { type DomPlugin } from './DomPlugin';
import { ManipulateDom } from './ManipulateDom';
import { type Plugin } from './Plugin';
import { TaskRunner } from './TaskRunner';
import { float } from './cheerio/float';
import { height } from './cheerio/height';
import { margin } from './cheerio/margin';
import { mso } from './cheerio/mso';
import { padding } from './cheerio/padding';
import { style } from './cheerio/style';
import { width } from './cheerio/width';
import { ReplaceQueryStrings } from './dom/ReplaceQueryStrings';

export function encodeFreemarkerTags(src: string): string {
    for(const item of parse(src)) {
        if(!item.match(/<\/?#\w+/)) {
            continue;
        }
        
        const replacement = encodeHtmlEntities(
            item.replace(/^<(\/?#.+)>/, '{{$1#}}')
        );

        if(!replacement) {
            continue;
        }

        src = src.replace(item, replacement);
    }

    return src;
}

export function decodeFreemarkerTags(src: string): string {
    const pattern = /{{(\/)?#(.+?)#}}/g;
    const matches = src.match(pattern);

    if(matches) {
        for(const match of matches) {
            src = src.replace(match, decodeHtmlEntities(
                match.replace(pattern, '<$1#$2>')
            ));
        }
    }
    
    return src;
}

const $textarea = cheerio('<textarea/>')('textarea');

export function decodeHtmlEntities(str: string) {
    return $textarea.html(str).text();
}

export function encodeHtmlEntities(str: string) {
    return $textarea.text(str).html();
}

export function cheerio(src?: string | AnyNode[], options: CheerioOptions = {}): CheerioAPI {
    if(typeof src === 'string') {
        src = encodeFreemarkerTags(src);
    }

    const $ = load(src ?? [], options, typeof src === 'string' && !isFragment(src));

    $.prototype.float = float;
    $.prototype.height = height;
    $.prototype.margin = margin;
    $.prototype.mso = mso;
    $.prototype.padding = padding;
    $.prototype.style = style;
    $.prototype.width = width;

    const html = $.html;

    $.html = function(this: CheerioAPI, dom?: BasicAcceptedElems<AnyNode>, options?: CheerioOptions) {
        return decodeFreemarkerTags(html.call(this, dom, options));
    } as typeof $.html;
    
    return $;
};

export function isFragment(src?: string): boolean {
    if(!src) {
        return true;
    }

    return !src.match(/<(body|html).+?>?/)?.length;
};

export async function run(src: string, plugins: Plugin[]): Promise<string> {
    const runner = new TaskRunner(plugins.filter(plugin => plugin.enabled));

    return await runner.process(src);
}

export async function manipulate(src: string, plugins: DomPlugin[]): Promise<string> {
    return await run(src, [
        new ManipulateDom(plugins)
    ]);
}

export function isNodeMsoComment(node: AnyNode): boolean {
    return node.nodeType === 8 && !!node.data.trim().match(/^\[if\s+mso\]/);
}

export function extractMsoComments(html: string | CheerioAPI): Cheerio<Comment> {
    const $ = typeof html === 'string' ? cheerio(html) : html;

    return extractMsoCommentNodes($('*'));
}

export function extractMsoCommentNodes(node: Cheerio<AnyNode>): Cheerio<Comment> {
    return node.contents()
        .filter((_, node) => isNodeMsoComment(node)) as Cheerio<Comment>;
}

export function extractUrlsFromMsoCommentNode(node: Comment): string[] {
    const matches = node.data.match(/^\[if\s+mso\]>(.+)\<\!\[endif\]/s);

    if(!matches) {
        return [];
    }

    return extractUrls(matches[1]);
}

export function extractMsoCommentUrls(html: string | CheerioAPI) {
    const $ = typeof html === 'string' ? cheerio(html) : html;
        
    return extractMsoCommentNodes($('*')).map((_, node) => {
        return extractUrlsFromMsoCommentNode(node);
    }).toArray();
}


export function extractMsoCommentUrlsFromElement($el: Cheerio<AnyNode>) {
    return extractMsoCommentNodes($el)
        .map((_, node) => extractUrlsFromMsoCommentNode(node))
        .toArray();
}

export function extractUrlsFromElement($el: Cheerio<AnyNode>) {
    return [
        $el.attr('href'),
        ...extractMsoCommentUrlsFromElement($el)
    ].filter(Boolean) as string[];
}

export function extractUrls(html: string | CheerioAPI | Cheerio<AnyNode>): string[] {
    if(typeof html === 'string' || typeof html === 'function') {
        const $ = typeof html === 'string' ? cheerio(html) : html;

        return $('[href]')
            .map((_, el) => extractUrlsFromElement($(el)))
            .filter((_, value) => {
                try {
                    return !!(new URL(value.toString()));
                }
                catch {
                    return false;
                }
            })
            .toArray()
            .concat(extractMsoCommentUrls($));
    }

    return extractUrlsFromElement(html);
}

export type ExtractedSourceCodes = {
    [param: string]: {
        [param: string]: number
    }
}

export function extractSourceCodes(html: string | CheerioAPI): ExtractedSourceCodes {
    const $ = typeof html === 'string' ? cheerio(html) : html;

    return extractUrls($).reduce<ExtractedSourceCodes>((carry, str) => {
        const url = new URL(str);
            
        for(const [key, value] of url.searchParams.entries()) {
            if(!(key in carry)) {
                carry[key] = {};
            }

            if(!(value in carry[key])) {
                carry[key][value] = 1;
            }
            else {
                carry[key][value]++;
            }
        }       

        return carry;
    }, {});
}

export type SourceCodeReplacement = {
    key: string,
    from: string|RegExp,
    to: string
} | {
    from: string|RegExp,
    to: string
} | {
    key: string,
    to: string
}

export function replaceQueryString(href: string, replacements: SourceCodeReplacement[]) {
    let url: URL;
    
    try {
        url = new URL(href);
    }
    catch {
        return href;
    }

    if(!url.searchParams.size) {
        return url.toString();
    }

    for(const replacement of replacements) {
        replaceSearchParams(url.searchParams, replacement);
    }

    const rawQueryString = '?' + [...url.searchParams.entries()].map(([key, value]) => {
        return `${key}=${value}`;
    }).join('&');

    return url.toString().replace(url.search, rawQueryString);
}

export function replaceSearchParams(params: URLSearchParams, replacement: SourceCodeReplacement) {
    if(!isValidSearchParamKey(params, replacement)) {
        return;
    }

    const pattern = sourceCodeReplacementPattern(replacement);
    const keys = 'key' in replacement ? [replacement.key] : params.keys();

    for(const key of keys) {
        const values = params.getAll(key);

        for(const value of values) {
            if(value === null) {
                continue;
            }
            
            if(pattern.test(value)) {
                params.set(key, replacement.to.replace(/\s/g, '%20'));
            }
        }
        
    }
}

export function isValidSearchParamKey(params: URLSearchParams, replacement: SourceCodeReplacement): boolean {
    if(!('key' in replacement)) {
        return true;
    }

    return params.has(replacement.key);
}

export function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function sourceCodeReplacementPattern(replacement: SourceCodeReplacement): RegExp {
    if(!('from' in replacement)) {
        return /.+/i;
    }

    if(replacement.from instanceof RegExp) {
        return replacement.from;
    }
    
    return new RegExp(escapeRegExp(replacement.from), 'i');
}

export function useReplaceQueryStrings(src: string | CheerioAPI) {
    const sourceCodes = ref(Object.entries(
        extractSourceCodes(src)
    ).map<[string, (SourceCodeReplacement & {count: number})[]]>(([key, value]) => {
        return [key, Object.entries(value).map(([value, count]) => ({
            key,
            from: value,
            to: value,
            count
        }))];
    }));

    const model = computed(() => {
        return sourceCodes.value.map(([, value]) => value).flat(1);
    });

    async function replace() {
        return await manipulate(src.toString(), [
            new ReplaceQueryStrings({
                sourceCodes: model.value
            })
        ]);
    }

    return {
        model,
        sourceCodes,
        replace
    };
}