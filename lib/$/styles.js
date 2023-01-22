module.exports = function() {
    const style = this.get(0).style;

    return Array.from(style).reduce((carry, attr) => {
        return Object.assign(carry, {
            [attr]: style[attr]
        });
    }, {});
};