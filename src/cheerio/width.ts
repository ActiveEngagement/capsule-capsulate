import { Cheerio, type AnyNode } from 'cheerio';
// @ts-ignore
import * as units from 'units-css';

declare module 'cheerio' {
    interface Cheerio<T> {
        width(this: Cheerio<T>): string|undefined;
    }
}

export function width(this: Cheerio<AnyNode>) {
    if(this.attr('width')) {
        return this.attr('width');
    }

    if(this.css('max-width')) {
        return unit(this.css('max-width'));
    }
    
    if(this.css('width')) {
        return unit(this.css('width'));
    }
};

function unit(value?: string) {
    const parsed = units.parse(value?.replace('!important', '').trim());

    if(!parsed.unit) {
        return `${value}px`;
    }

    if(parsed.unit === '%') {
        return value;
    }

    try {
        return units.convert('px', value);
    }
    catch (e) {
        return value; 
    }
}