import { AnyNode, Cheerio, CheerioAPI } from "cheerio";
import BaseDomPlugin from '../DomPlugin';

export default class RemoveDisplayNone extends BaseDomPlugin {

    protected nodes: AnyNode[] = []

    async process($el: Cheerio<AnyNode>) {
        if($el.css('display') === 'none') {
            this.nodes.push($el.get(0));
        }
    }

    async postprocess($: CheerioAPI) {
        for(const el of this.nodes) {
            $(el).remove();
        }
        
        return $;
    }

}