import { Cheerio, type AnyNode } from 'cheerio';
// @ts-ignore
import parse from 'css-shorthand-parser';
// @ts-ignore
import cssShorthandProps from 'css-shorthand-properties';
import camelCase from 'lodash.camelcase';
import pickBy from 'lodash.pickby';

declare module 'cheerio' {
    interface Cheerio<T> {
        style(this: Cheerio<T>, attr: string): Record<string,string>;
    }
}

class ComputedStyle {
    constructor(
        protected readonly props: Record<string,string>
    ) {
        for(const [key, value] of Object.entries(props)) {
            Object.defineProperty(this, key, {
                get: () => value
            });

            Object.defineProperty(this, camelCase(key), {
                get: () => value
            });
        }
    }

    get keys() {
        return Object.keys(this.props);
    }
}

export default function style(this: Cheerio<AnyNode>, attr: string): ComputedStyle {
    if(!cssShorthandProps.isShorthand(attr)) {
        const css = this.css(attr);

        if(!css) {
            return new ComputedStyle({ });
        }

        return new ComputedStyle({ [attr]: css });
    }

    const shorthand = this.css(attr) && parse(attr, this.css(attr));
    
    const longhand = pickBy(
        cssShorthandProps.expand(attr).reduce((carry: any, key: any) => {
            return Object.assign(carry, { [key]: this.css(key) });
        }, {})
    );

    return new ComputedStyle(Object.assign({}, shorthand, longhand));
}