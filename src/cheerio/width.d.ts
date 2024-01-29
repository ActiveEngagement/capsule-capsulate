import { Cheerio, type AnyNode } from 'cheerio';
declare module 'cheerio' {
    interface Cheerio<T> {
        width(this: Cheerio<T>): string | undefined;
    }
}
export function (this: Cheerio<AnyNode>): any;
