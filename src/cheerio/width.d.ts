import { Cheerio, type AnyNode } from 'cheerio';
declare module 'cheerio' {
    interface Cheerio<T> {
        width(this: Cheerio<T>): string | undefined;
    }
}
export default function (this: Cheerio<AnyNode>): any;
