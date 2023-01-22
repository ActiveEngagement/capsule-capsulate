const jQuery = require('../jquery');
const traverse = require('../traverse');

function $(subject, parent) {
    const $ = jQuery(subject, parent);
    
    $.prototype.open = () => opening.data;
    $.prototype.close = () => closing.data;
    $.prototype.text = function() {
        return this.map((i, el) => el).get().join('\n');
    };

    return $;
}

function isClosingMso(value) {
    return value.toString().match(/\[(\s)?if(.+)?>(\s+)?<\/(.+)?/m);
}

function isOpeningMso(value) {
    return value.toString().match(/\[(\s)?if(.+)?>(.+)?<table.+/m);
}

function openingMso(el, parent) {
    return traverse(el, parent && parent.children, -1, (sibling, index) => {
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
    return traverse(el, parent && parent.children, 1, (sibling, index) => {
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

exports.openingMso = function() {
    const el = this.get(0);
    const parent = el.parent || el.root;

    const opening = openingMso(el, parent);

    if(!opening) {
        return undefined;
    }

    return $(opening, parent);
};

exports.closingMso = function() {
    const el = this.get(0);
    const parent = el.parent || el.root;

    const closing = closingMso(el, parent);

    if(!closing) {
        return undefined;
    }

    return $(closing, parent);
};

exports.mso = function() {
    const el = this.get(0);
    const parent = el.parent || el.root;
    const opening = openingMso(el, parent);
    const closing = closingMso(el, parent);

    if(!opening || !closing) {
        return undefined;
    }

    return $([opening.data, closing.data], parent);
};