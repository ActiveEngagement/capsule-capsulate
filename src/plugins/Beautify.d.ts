import { HTMLBeautifyOptions } from 'js-beautify';
import { BasePlugin } from '../Plugin';
export class Beautify extends BasePlugin<HTMLBeautifyOptions> {
    defaultOptions(): HTMLBeautifyOptions;
    transform(src: string): Promise<string>;
}
