import { Cheerio, type AnyNode } from 'cheerio';
declare module 'cheerio' {
    interface Cheerio<T> {
        float(this: Cheerio<T>): string | undefined;
    }
}
export function float(this: Cheerio<AnyNode>): string | undefined;
