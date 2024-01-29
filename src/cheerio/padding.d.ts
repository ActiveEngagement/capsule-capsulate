import { Cheerio, type AnyNode } from 'cheerio';
declare module 'cheerio' {
    interface Cheerio<T> {
        padding(this: Cheerio<T>): string | undefined;
    }
}
export function padding(this: Cheerio<AnyNode>): string | undefined;
