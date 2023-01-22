const { parse, convert } = require('../convert');

function unit(value, el) {
    if(parse(value).unit === '%') {
        return value;
    }

    return convert('px', value, el);
}

module.exports = function() {
    if(this.attr('width')) {
        return this.attr('width');
    }

    if(this.get(0).style.maxWidth) {
        return unit(this.get(0).style.maxWidth);
    }
    
    if(this.get(0).style.width) {
        return unit(this.get(0).style.width);
    }
    
    return null;
};