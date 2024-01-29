import { AnyNode, Cheerio, Element } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';

function isVoidElement($el: Cheerio<AnyNode>) {
    const voidElements = [
        'area', 'base', 'br', 'col', 'command',
        'embed', 'hr', 'img', 'input', 'keygen',
        'link', 'meta', 'param', 'source', 'track', 'wbr'
    ];
  
    const el = $el.get(0);

    if(el && el?.nodeType === 1) {
        return voidElements.includes((el as Element).tagName);
    }

    return false;
}

function shouldApplyFloatToParent($el: Cheerio<AnyNode>) {
    if(isVoidElement($el) || !$el.parent().length) {
        return false;
    }

    return (
        !$el.parent().css('float') && 
        !$el.parent().attr('align') && (
            $el.parent().get(0)?.name !== 'a' ||
            $el.parent().css('display') !== 'inline'
        )
    );
}

export class FixFloatAlignment extends BaseDomPlugin {
    async process($el: Cheerio<AnyNode>) {
        const align = $el.attr('align');
    
        if(align && shouldApplyFloatToParent($el)) {
            $el.parent().attr('align', align);
        }
    }    
};