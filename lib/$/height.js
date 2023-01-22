module.exports = function() {
    if(this.attr('height')) {
        return this.attr('height');
    }
    
    if(this.get(0).style.maxHeight) {
        return this.get(0).style.maxHeight;
    }
    
    if(this.get(0).style.height) {
        return this.get(0).style.height;
    }
    
    return null;
};