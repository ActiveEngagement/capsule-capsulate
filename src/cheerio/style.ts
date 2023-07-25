import parse from 'css-shorthand-parser';
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
            })

            Object.defineProperty(this, camelCase(key), {
                get: () => value
            })
        }
    }

    get keys() {
        return Object.keys(this.props);
    }
}

export default function style(attr: string): ComputedStyle {
    if(!cssShorthandProps.isShorthand(attr)) {
        return new ComputedStyle({ [attr]: this.css(attr) });
    }

    const shorthand = this.css(attr) && parse(attr, this.css(attr));
    
    const longhand = pickBy(cssShorthandProps.expand(attr).reduce((carry, key) => {
        return Object.assign(carry, { [key]: this.css(key) });
    }, {}));

    return new ComputedStyle(Object.assign({}, shorthand, longhand));
}