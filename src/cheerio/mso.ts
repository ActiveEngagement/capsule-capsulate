import { AnyNode, Element } from "cheerio";

declare module 'cheerio' {
    interface Cheerio<T> {
        mso(this: Cheerio<T>): [AnyNode, AnyNode]|undefined;
    }
}

export default function mso() {
    const el: Element = this.get(0);

    const opening = openingMso(el, el.parent);
    const closing = closingMso(el, el.parent);

    if(opening && closing) {
        return [opening, closing];
    };
};

function openingMso(el, parent) {
    return traverse(el, parent && parent.children, -1, (sibling) => {
        if(sibling.type === 'tag') {
            return false;
        }

        if(isClosingMso(sibling.data)) {
            return false;
        }

        if(isOpeningMso(sibling.data)) {
            return sibling;
        }
    });
}

function closingMso(el, parent) {
    return traverse(el, parent && parent.children, 1, (sibling) => {
        if(sibling.type === 'tag') {
            return false;
        }

        if(isOpeningMso(sibling.data)) {
            return false;
        }

        if(isClosingMso(sibling.data)) {
            return sibling;
        }
    });
}

function traverse(el, children, modifier, fn) {
    if(!children) {
        return;
    }

    let child, index = children.indexOf(el);

    while(child = children[index + modifier]) {
        if(fn instanceof Function) {
            const response = fn(child, index);

            if(response !== undefined) {
                return response;
            }
        }

        index += modifier;
    }
};

function isClosingMso(value) {
    return value.toString().match(/\[(\s)?if(.+)?>(\s+)?<\/(.+)?/m);
}

function isOpeningMso(value) {
    return value.toString().match(/\[(\s)?if(.+)?>(.+)?<table.+/m);
}