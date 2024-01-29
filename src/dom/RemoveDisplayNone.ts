import { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';

export class RemoveDisplayNone extends BaseDomPlugin {

    protected nodes: AnyNode[] = [];

    async process($el: Cheerio<AnyNode>) {
        const child = $el.get(0);

        if($el.css('display') === 'none' && child) {
            this.nodes.push(child);
        }
    }

    async postprocess($: CheerioAPI) {
        for(const el of this.nodes) {
            $(el).remove();
        }
        
        return $;
    }

}