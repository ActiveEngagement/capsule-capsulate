import { Cheerio, type AnyNode } from 'cheerio';
declare module 'cheerio' {
    interface Cheerio<T> {
        height(this: Cheerio<T>): string | undefined;
    }
}
export function height(this: Cheerio<AnyNode>): string | undefined;
