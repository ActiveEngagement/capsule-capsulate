import { Cheerio, type AnyNode } from 'cheerio';
declare module 'cheerio' {
    interface Cheerio<T> {
        mso(this: Cheerio<T>): [AnyNode, AnyNode] | undefined;
    }
}
export default function mso(this: Cheerio<AnyNode>): (true | AnyNode)[] | undefined;
