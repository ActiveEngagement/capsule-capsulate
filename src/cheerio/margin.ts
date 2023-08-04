declare module 'cheerio' {
    interface Cheerio<T> {
        margin(this: Cheerio<T>): string|undefined;
    }
}

export default function margin() {
    const props: Record<string, string> = {};
    
    for(const [ key, value ] of Object.entries<string>(this.first().css())) {
        if(key.toLowerCase().match(/^margin/)) {
            props[key.toLowerCase()] = value;
        }
    }

    if(!Object.keys(props).length) {
        return;
    }

    if(props.margin) {
        return props.margin;
    }

    return `margin: ${props['margin-top'] ?? '0'} ${props['margin-left'] ?? '0'} ${props['margin-bottom'] ?? '0'} ${props['margin-right'] ?? '0'};`;
};