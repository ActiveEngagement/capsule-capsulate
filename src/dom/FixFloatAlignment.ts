import { AnyNode, Cheerio } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';

export default class FixFloatAlignment extends BaseDomPlugin {

    async process($el: Cheerio<AnyNode>) {
        const align = $el.attr('align');
    
        if(align && this.shouldApplyFloatToParent($el)) {
            $el.parent().attr('align', align);
        }
    }
    
    shouldApplyFloatToParent($el: Cheerio<AnyNode>) {
        if(!$el.parent().length) {
            return false;
        }

        return (
            !$el.parent().css('float') && 
            !$el.parent().attr('align') && (
                $el.parent().get(0).name !== 'a' ||
                $el.parent().css('display') !== 'inline'
            )
        );
    }

};