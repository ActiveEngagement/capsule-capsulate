import BasePlugin from '../Plugin';
export default class DecodeHrefAmpersands extends BasePlugin {
    transform(src: string): Promise<string>;
}
