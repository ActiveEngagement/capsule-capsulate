import { Cheerio, type AnyNode, type CheerioAPI } from 'cheerio';
import { BasePlugin } from '../Plugin';

export type PreviewTextHtml = Cheerio<AnyNode> | string | undefined | null;

export type PreviewTextFunction = ($: CheerioAPI) => PreviewTextHtml;

export type PreviewTextOptions = {
    html?: string | null | PreviewTextFunction;
}

function value<T extends unknown[]>(subject?: string|null|((...args: T) => PreviewTextHtml), ...args: T) {
    if(subject === undefined || subject === null) {
        return subject;
    }

    if(typeof subject === 'string') {
        return subject;
    }

    return subject(...args);
}

function toCheerio(subject: string|Cheerio<AnyNode>, $: CheerioAPI): [Cheerio<AnyNode>, boolean] {
    let el: Cheerio<AnyNode>;

    try {
        el = $(subject);
    }
    catch {
        el = $('<div/>').html(subject);
    }

    if(el.prop('outerHTML')) {
        return [el, true];
    }

    return [$('<div/>').html(subject), false];
}

export class PreviewText extends BasePlugin<PreviewTextOptions> {

    protected previewTextElement?: Cheerio<AnyNode> = undefined;
    
    async preprocess($: CheerioAPI) {
        const previewText = value(this.options.html, $);

        if(previewText === undefined) {
            return $;
        }

        this.previewTextElement = $($('div:first').filter((_,el) => {
            return $(el).css('display') === 'none';
        }).get(0));

        if(previewText === null) {
            this.previewTextElement.remove();
            this.previewTextElement = undefined;

            return $;
        }

        const [el, isHtml] = toCheerio(previewText, $);

        if(!this.previewTextElement.length) {
            this.previewTextElement = el;
        }
        else if(isHtml) {
            this.previewTextElement.replaceWith(el);
            this.previewTextElement = el;
        }
        else {
            this.previewTextElement.html(el.html() ?? '');
        }

        this.previewTextElement.remove();
        
        return $;
    }

    async postprocess($: CheerioAPI) {
        if(!this.previewTextElement) {
            return $;
        }

        this.previewTextElement.css('display', 'none');

        if($('body').length) {
            $('body').prepend($(this.previewTextElement));
        }
        else {
            $.root().prepend(this.previewTextElement);
        }

        // const nextNode = $(this.previewTextElement).get(0)?.nextSibling;

        // if(!nextNode || nextNode.nodeType !== 3) {
        //     $(this.previewTextElement).after('\n\n');
        // } else {
        //     const textContent = nextNode.nodeValue;
            
        //     const leadingNewlines = textContent.match(/^(\n*)/)?.[1].length;
   
        //     if(leadingNewlines === 0) {
        //         $(this.previewTextElement).after('\n\n');
        //     } else if(leadingNewlines === 1) {
        //         $(this.previewTextElement).after('\n');
        //     }
        // }

        return $;
    }

};