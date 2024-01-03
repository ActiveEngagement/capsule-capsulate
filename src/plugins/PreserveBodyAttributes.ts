import { CheerioAPI } from 'cheerio';
import BasePlugin from '../Plugin';

export default class PreserveBodyAttributes extends BasePlugin {

    protected classes: string[] = [];

    protected attrs: Record<string,string> = {};

    async preprocess($: CheerioAPI) {
        this.classes = ($('body').attr('class') ?? '').split(' ');
        this.attrs = Object.assign({}, $('body').attr());

        delete this.attrs.class;

        return $;
    }

    async postprocess($: CheerioAPI) {
        $('body').attr(Object.assign({}, this.attrs, $('body').attr()));

        for(const key of this.classes) {
            $('body').addClass(key);
        }

        return $;
    }

};