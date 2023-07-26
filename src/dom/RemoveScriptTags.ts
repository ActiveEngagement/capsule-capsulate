import { CheerioAPI } from "cheerio";
import BaseDomPlugin from '../DomPlugin';

export default class RemoveScriptTags extends BaseDomPlugin {

    async postprocess($: CheerioAPI) {
        $('script').remove();

        return $;
    }
    
}