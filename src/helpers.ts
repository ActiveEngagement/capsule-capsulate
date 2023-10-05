import { parse } from 'capsule-lint';
import { Cheerio, CheerioAPI, load, type AnyNode, type CheerioOptions } from 'cheerio';
import { Comment } from 'domhandler';
import { type DomPlugin } from './DomPlugin';
import ManipulateDom from './ManipulateDom';
import { type Plugin } from './Plugin';
import TaskRunner from './TaskRunner';
import float from './cheerio/float';
import height from './cheerio/height';
import margin from './cheerio/margin';
import mso from './cheerio/mso';
import padding from './cheerio/padding';
import style from './cheerio/style';
import width from './cheerio/width';

export function encodeFreemarkerTags(src: string | AnyNode[]) {
    if(Array.isArray(src)) {
        return src;
    }

    for(const item of parse(src)) {
        if(!item.match(/<\/?#\w+/)) {
            continue;
        }
        
        src = src.replace(item, encodeHtmlEntities(
            item.replace(/^<(\/?#.+)>/, '{{$1#}}')
        ));
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
    const $ = load(encodeFreemarkerTags(src) ?? [], options, typeof src === 'string' && !isFragment(src));

    $.prototype.float = float;
    $.prototype.height = height;
    $.prototype.margin = margin;
    $.prototype.mso = mso;
    $.prototype.padding = padding;
    $.prototype.style = style;
    $.prototype.width = width;

    return $;
};

export function isFragment(src?: string): boolean {
    return src && !src.match(/<(body|html).+?>?/);
};

export async function run(src: string, plugins: Plugin[]): Promise<string> {
    const runner = new TaskRunner(plugins);

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
    const matches = node.data.match(/^\[if\s+mso\]>(.+)\<\!\[endif\]/);

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
    ].filter(Boolean);
}

export function extractUrls(html: string | CheerioAPI | Cheerio<AnyNode>): string[] {
    if(typeof html === 'string' || typeof html === 'function') {
        const $ = typeof html === 'string' ? cheerio(html) : html;

        return $('[href]')
            .map((i, el) => extractUrlsFromElement($(el)))
            .toArray()
            .concat(extractMsoCommentUrls($));
    }

    return extractUrlsFromElement(html);
}

export type ExtractedSourceCodes = Record<string,string[]>;

export function extractSourceCodes(html: string | CheerioAPI): ExtractedSourceCodes {
    const $ = typeof html === 'string' ? cheerio(html) : html;

    return extractUrls($).reduce<ExtractedSourceCodes>((carry, str) => {
        const url = new URL(str);
            
        for(const [key, value] of url.searchParams.entries()) {
            if(!(key in carry)) {
                carry[key] = [];
            }

            if(!carry[key].includes(value)) {
                carry[key].push(value);
            }
        }       

        return carry;
    }, {});
}