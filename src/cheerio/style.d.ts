import { Cheerio, type AnyNode } from 'cheerio';
declare module 'cheerio' {
    interface Cheerio<T> {
        style(this: Cheerio<T>, attr: string): Record<string, string>;
    }
}
declare class ComputedStyle {
    protected readonly props: Record<string, string>;
    constructor(props: Record<string, string>);
    get keys(): string[];
}
export default function style(this: Cheerio<AnyNode>, attr: string): ComputedStyle;
export {};
