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

    $.html = (...args: any[]) => {
        return decodeFreemarkerTags(html.call($, ...args));
    };
    
    return $;
};

export function isFragment(src?: string): boolean {
    if(!src) {
        return true;
    }

    return !src.match(/<(body|html).+?>?/)?.length;
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
    ].filter(Boolean) as string[];
}

export function extractUrls(html: string | CheerioAPI | Cheerio<AnyNode>): string[] {
    if(typeof html === 'string' || typeof html === 'function') {
        const $ = typeof html === 'string' ? cheerio(html) : html;

        return $('[href]')
            .map((_, el) => extractUrlsFromElement($(el)))
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