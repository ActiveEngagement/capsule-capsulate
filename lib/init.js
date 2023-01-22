const camelCase = require('lodash.camelcase');
const Plugin = require('./Plugin');

module.exports = function(plugins, options = {}) {
    return (plugins || [])
        .filter(plugin => {
            return plugin instanceof Plugin
                || options[camelCase(plugin.name)] !== false;
        })
        .map(plugin => {
            if(plugin instanceof Plugin) {
                return plugin;
            }

            return new plugin(options[camelCase(plugin.name)]);  
        });
};