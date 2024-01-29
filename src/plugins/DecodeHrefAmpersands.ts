import { BasePlugin } from '../Plugin';

export class DecodeHrefAmpersands extends BasePlugin {

    async transform(src: string) {
        const matches = src.match(/(?<attr>href=(?<quote>["']).*?\2)/gm);

        if(matches) {
            for(const match of matches) {
                src = src.replace(match, match.replace(/&amp;/g, '&'));
            }
        }

        return src;
    }

};