import { Cheerio, type AnyNode, type ParentNode } from 'cheerio';

declare module 'cheerio' {
    interface Cheerio<T> {
        mso(this: Cheerio<T>): [AnyNode, AnyNode]|undefined;
    }
}

export function mso(this: Cheerio<AnyNode>) {
    const el = this.get(0);

    const opening = openingMso(el, el?.parent);
    const closing = closingMso(el, el?.parent);

    if(opening && closing) {
        return [opening, closing];
    };
};

function openingMso(el?: AnyNode|null, parent?: ParentNode|null) {
    return traverse(el, parent?.children, -1, (sibling: any) => {
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

function closingMso(el?: AnyNode|null, parent?: ParentNode|null) {

    return traverse(el, parent?.children, 1, (sibling) => {
        if(sibling.type === 'tag') {
            return false;
        }

        if(sibling && 'data' in sibling && isOpeningMso(sibling.data)) {
            return false;
        }

        if(sibling && 'data' in sibling && isClosingMso(sibling.data)) {
            return sibling;
        }
    });
}

function traverse(el: AnyNode|null|undefined, children: AnyNode[]|null|undefined, modifier: number, fn?: (node: AnyNode, index: number) => AnyNode|boolean|undefined) {
    if(!el || !children) {
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

function isClosingMso(value?: AnyNode|string|null) {
    return value?.toString().match(/\[(\s)?if(.+)?>(\s+)?<\/(.+)?/m);
}

function isOpeningMso(value?: AnyNode|string|null) {
    return value?.toString().match(/\[(\s)?if(.+)?>(.+)?<table.+/m);
}