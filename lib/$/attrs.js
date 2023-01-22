module.exports = function() {
    return Array.from(this.get(0).attributes).reduce((carry, attr) => {
        return Object.assign(carry, attr.specified && {
            [attr.name]: attr.value
        });
    }, {});
};