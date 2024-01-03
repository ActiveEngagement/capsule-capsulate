import { Cheerio, type AnyNode } from 'cheerio';
declare module 'cheerio' {
    interface Cheerio<T> {
        margin(this: Cheerio<T>): string | undefined;
    }
}
export default function margin(this: Cheerio<AnyNode>): string | undefined;
