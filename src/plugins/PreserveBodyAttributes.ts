import { CheerioAPI } from 'cheerio';
import BasePlugin from '../Plugin';

export default class PreserveBodyAttributes extends BasePlugin {

    protected attrs: Record<string,string>

    async process($: CheerioAPI) {
        this.attrs = $('body').attr();

        return $;
    }

    async postprocess($: CheerioAPI) {
        $('body').attr(this.attrs);

        return $;
    }

};