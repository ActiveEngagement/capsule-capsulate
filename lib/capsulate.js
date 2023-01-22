const ManipulateDom = require('../plugins/ManipulateDom');
const run = require('./run');

module.exports = async(src, options = {}) => {
    return await run(src, [
        require('../plugins/InlineCss'),
        require('../plugins/PreserveBodyAttributes'),
        require('../plugins/ExtractTarget'),
        require('../plugins/Template'),
        new ManipulateDom([
            require('../dom/FixBackgroundColor'),
            require('../dom/FixFloatAlignment'),
            require('../dom/FixFontColor'),
            require('../dom/FixMsoWrapper'),
            require('../dom/FixResponsiveImages'),
            require('../dom/FixTableAlignment'),
            require('../dom/RemoveDisplayNone'),
            require('../dom/RemoveScriptTags'),
        ], options.dom),
        require('../plugins/HtmlMinifier'),
        require('../plugins/DecodeHrefAmpersands')
    ], options);
};