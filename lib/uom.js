module.exports = function(value) {
    const matches = value && value.toString().match(/^\d+([a-zA-Z]+)$/);

    if(matches) {
        return matches[1];
    }

    return null;
};