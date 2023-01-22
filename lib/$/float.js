module.exports = function() {
    if(this.attr('align')) {
        return this.attr('align');
    }
    
    if(this.css('float')) {
        return this.css('float');
    }
    
    return null;
};

/*
Replaced: 

function getFloat(el) {
    if(el.getAttribute('align')) {
        return el.getAttribute('align');
    }
    else if(el.style.float) {
        return el.style.float;
    }
    else if(el.style.cssFloat) {
        return el.style.cssFloat;
    }
    else if(el.getAttribute('style')) {
        const matches = el.getAttribute('style') ? 
            el.getAttribute('style').match(/float:\s?(.+?);/) : null
        
        return matches &&matches[1] ? matches[1].trim() : null;
    }

    return null;
}
*/
