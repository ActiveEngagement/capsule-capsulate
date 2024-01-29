import { BasePlugin } from '../Plugin';
export class DecodeHrefAmpersands extends BasePlugin {
    transform(src: string): Promise<string>;
}
