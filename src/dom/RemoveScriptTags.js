const Plugin = require('../lib/Plugin');

class RemoveScriptTags extends Plugin {

    async postprocess({ window: { document }}) {
        document.querySelectorAll('script').forEach(el => {
            el.parentNode.removeChild(el);
        });
    }
    
}

module.exports = RemoveScriptTags;