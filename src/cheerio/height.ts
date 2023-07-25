declare module 'cheerio' {
    interface Cheerio<T> {
        height(this: Cheerio<T>): string|undefined;
    }
}

export default function height() {
    if(this.attr('height')) {
        return this.attr('height');
    }
    
    return this.css('height') || this.css('max-height');
};