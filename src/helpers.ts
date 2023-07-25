import { AnyNode, CheerioAPI, CheerioOptions, load } from 'cheerio';
import { DomPlugin } from './DomPlugin';
import ManipulateDom from './ManipulateDom';
import { TaskRunner } from './TaskRunner';
import float from './cheerio/float';
import height from './cheerio/height';
import margin from './cheerio/margin';
import mso from './cheerio/mso';
import padding from './cheerio/padding';
import style from './cheerio/style';
import width from './cheerio/width';

export function cheerio(src?: string | AnyNode[], options: CheerioOptions = {}): CheerioAPI {
    const $ = load(src ?? [], options, typeof src === 'string' && !isFragment(src));

    $.prototype.float = float;
    $.prototype.height = height;
    $.prototype.margin = margin;
    $.prototype.mso = mso;
    $.prototype.padding = padding;
    $.prototype.style = style;
    $.prototype.width = width;
    
    // $.prototype.float = require('./$/float');
    // $.prototype.height = require('./$/height');
    // $.prototype.mso = require('./$/mso').mso;
    // $.prototype.width = require('./$/width');

    return $;
};

export function isFragment(src?: string) {
    return src && !src.match(/<(body|html).+?>?/)
};

export async function manipulate(src: string, plugins: DomPlugin[]) {
    const runner = new TaskRunner([
        new ManipulateDom(plugins)
    ]);

    return await runner.process(src);
}