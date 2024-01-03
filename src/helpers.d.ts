import { Cheerio, CheerioAPI, type AnyNode, type CheerioOptions } from 'cheerio';
import { Comment } from 'domhandler';
import { type DomPlugin } from './DomPlugin';
import { type Plugin } from './Plugin';
export declare function encodeFreemarkerTags(src: string): string;
export declare function decodeFreemarkerTags(src: string): string;
export declare function decodeHtmlEntities(str: string): string;
export declare function encodeHtmlEntities(str: string): string | null;
export declare function cheerio(src?: string | AnyNode[], options?: CheerioOptions): CheerioAPI;
export declare function isFragment(src?: string): boolean;
export declare function run(src: string, plugins: Plugin[]): Promise<string>;
export declare function manipulate(src: string, plugins: DomPlugin[]): Promise<string>;
export declare function isNodeMsoComment(node: AnyNode): boolean;
export declare function extractMsoComments(html: string | CheerioAPI): Cheerio<Comment>;
export declare function extractMsoCommentNodes(node: Cheerio<AnyNode>): Cheerio<Comment>;
export declare function extractUrlsFromMsoCommentNode(node: Comment): string[];
export declare function extractMsoCommentUrls(html: string | CheerioAPI): string[];
export declare function extractMsoCommentUrlsFromElement($el: Cheerio<AnyNode>): string[];
export declare function extractUrlsFromElement($el: Cheerio<AnyNode>): string[];
export declare function extractUrls(html: string | CheerioAPI | Cheerio<AnyNode>): string[];
export type ExtractedSourceCodes = {
    [param: string]: {
        [param: string]: number;
    };
};
export declare function extractSourceCodes(html: string | CheerioAPI): ExtractedSourceCodes;
