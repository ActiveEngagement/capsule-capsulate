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

// Edit the value matching `from`, scoped to a single `key`.
export type KeyedSourceCodeReplacement = {
    key: string,
    from: string|RegExp,
    to: string
};

// Edit the value matching `from`, across every key.
export type ValueSourceCodeReplacement = {
    from: string|RegExp,
    to: string
};

// Upsert: no `from`, so `key` is set unconditionally — and created if absent.
export type UpsertSourceCodeReplacement = {
    key: string,
    to: string
};

export type SourceCodeReplacement =
    | KeyedSourceCodeReplacement
    | ValueSourceCodeReplacement
    | UpsertSourceCodeReplacement;

// Schemes that parse via `new URL` but break if we touch their query string:
// `mailto:foo@bar?utm=x` breaks mail clients, `#anchor` stops being a fragment, etc.
const SKIP_PREFIXES: readonly string[] = ['mailto:', 'tel:', '#', 'javascript:'];

// An upsert (no `from`) sets its key unconditionally, creating it when absent.
// Keyed edits keep their `from` and so still skip missing keys.
export function isUpsertReplacement(replacement: SourceCodeReplacement): replacement is UpsertSourceCodeReplacement {
    return 'key' in replacement && !('from' in replacement);
}

export function replaceQueryString(href: string, replacements: SourceCodeReplacement[]) {
    if(SKIP_PREFIXES.some(prefix => href.toLowerCase().startsWith(prefix))) {
        return href;
    }

    let url: URL;

    try {
        url = new URL(href);
    }
    catch {
        return href;
    }

    // Nothing to edit and nothing to upsert — bail before rebuilding the query.
    if(!url.searchParams.size && !replacements.some(isUpsertReplacement)) {
        return url.toString();
    }

    for(const replacement of replacements) {
        replaceSearchParams(url.searchParams, replacement);
    }

    // Still empty (no upsert matched) — avoid rebuilding a bare `?`.
    if(!url.searchParams.size) {
        return url.toString();
    }

    const rawQueryString = '?' + [...url.searchParams.entries()].map(([key, value]) => {
        return `${key}=${value}`;
    }).join('&');

    return url.toString().replace(url.search, rawQueryString);
}

export function replaceSearchParams(params: URLSearchParams, replacement: SourceCodeReplacement) {
    // An upsert creates its key when absent; then there is nothing left to match.
    if(isUpsertReplacement(replacement) && !params.has(replacement.key)) {
        params.set(replacement.key, replacement.to.replace(/\s/g, '%20'));

        return;
    }

    // Any other replacement whose key is absent has nothing to match.
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

export type KeyedSourceCodes = [string, (SourceCodeReplacement & {count: number})[]][];

export function extractKeyedSourceCodes(src: string | CheerioAPI): KeyedSourceCodes {
    return Object.entries(extractSourceCodes(src)).map(([key, value]) => [
        key,
        Object.entries(value).map(([value, count]) => ({
            key,
            from: value,
            to: value,
            count
        }))
    ]);
}

export function useReplaceQueryStrings(src: string | CheerioAPI) {
    // Mutable so successive replace() calls commit against the latest HTML
    // rather than the original src — otherwise edits from prior replace() calls
    // get diffed away.
    let currentSrc: string | CheerioAPI = src;

    const sourceCodes = ref(extractKeyedSourceCodes(currentSrc));

    // Codes to add to every link; with no `from`, each is upserted.
    const newSourceCodes = ref<UpsertSourceCodeReplacement[]>([]);

    const model = computed<SourceCodeReplacement[]>(() => {
        return [
            ...sourceCodes.value.map(([, value]) => value).flat(1),
            ...newSourceCodes.value
                .filter(code => code.key.trim())
                .map(code => ({ key: code.key.trim(), to: code.to }))
        ];
    });

    async function replace() {
        const html = await manipulate(currentSrc.toString(), [
            new ReplaceQueryStrings({
                sourceCodes: model.value
            })
        ]);

        // Refresh state from the committed HTML so newly-upserted params
        // move into sourceCodes with their counts, pending entries clear, and
        // the next replace() diffs against the just-committed HTML.
        currentSrc = html;
        sourceCodes.value = extractKeyedSourceCodes(html);
        newSourceCodes.value = [];

        return html;
    }

    return {
        model,
        sourceCodes,
        newSourceCodes,
        replace
    };
}