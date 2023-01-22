module.exports = function traverse(el, children, modifier, fn) {
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