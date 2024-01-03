import { Cheerio, type AnyNode } from 'cheerio';

declare module 'cheerio' {
    interface Cheerio<T> {
        padding(this: Cheerio<T>): string|undefined;
    }
}

export default function padding(this: Cheerio<AnyNode>) {
    const props: Record<string, string> = {};
    
    for(const [ key, value ] of Object.entries<string>(this.first().css() ?? {})) {
        if(key.toLowerCase().match(/^padding/)) {
            props[key.toLowerCase()] = value;
        }
    }

    if(!Object.keys(props).length) {
        return;
    }

    if(props.padding) {
        return props.padding;
    }

    return `padding: ${props['padding-top'] ?? '0'} ${props['padding-left'] ?? '0'} ${props['padding-bottom'] ?? '0'} ${props['padding-right'] ?? '0'};`;
};