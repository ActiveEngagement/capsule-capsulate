import { load, type AnyNode, type CheerioAPI, type CheerioOptions } from 'cheerio';
import { type DomPlugin } from './DomPlugin';
import ManipulateDom from './ManipulateDom';
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

    return src.replace(/<(\/)?#(.+)?>/g, '{{$1%$2%}}');
}

export function decodeHtmlEntities(str: string) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
}

export function decodeFreemarkerTags(src: string) {
    const pattern = /{{(\/)?%(.+?)%}}/g;
    const matches = src.match(pattern);

    if(matches) {
        for(const match of matches) {
            src = src.replace(match, decodeHtmlEntities(match).replace(pattern, '<$1#$2>'));
        }
    }

    return src;
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

export function isFragment(src?: string) {
    return src && !src.match(/<(body|html).+?>?/);
};

export async function manipulate(src: string, plugins: DomPlugin[]) {
    const runner = new TaskRunner([
        new ManipulateDom(plugins)
    ]);

    return await runner.process(src);
}