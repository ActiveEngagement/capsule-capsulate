import { AnyNode, Cheerio } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export type SourceCode = {
    key: string;
    from: string;
    to: string;
    count?: number;
};
export type ReplaceQueryStringOptions = SourceCode[];
export declare function replaceQueryString(href: string, replacements: SourceCode[]): string;
export class ReplaceQueryStrings extends BaseDomPlugin<ReplaceQueryStringOptions> {
    defaultOptions(): ReplaceQueryStringOptions;
    process($el: Cheerio<AnyNode>): Promise<void>;
}
