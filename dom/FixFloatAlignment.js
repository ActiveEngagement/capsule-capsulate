const Plugin = require('../lib/Plugin');

module.exports = class FixFloatAlignment extends Plugin {

    async process(el) {
        let align = el.getAttribute('align');
    
        if(align && this.shouldApplyFloatToParent(el)) {
            el.parentNode.setAttribute('align', align);
        }
    }
    
    shouldApplyFloatToParent(el) {
        if(!el.parentElement) {
            return false;
        }

        return (
            !el.parentElement.style.float && 
            !el.parentElement.getAttribute('align') && (
                !el.parentElement.tagName === 'A' ||
                !el.parentElement.style.display === 'inline'
            )
        );
    }

};