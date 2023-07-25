import InlineCss from "./plugins/InlineCss";
import { TaskRunner } from "./TaskRunner";

export type CapsulateOptions = {
    // inlineCss?: InlineCssOptions
}

export default async function capsulate(src: string, options: CapsulateOptions = {}) {
    const runner = new TaskRunner([
        new InlineCss(),
        // require('../plugins/PreserveBodyAttributes'),
        // require('../plugins/ExtractTarget'),
        // require('../plugins/Template'),
        // new ManipulateDom([
        //     require('../dom/FixBackgroundColor'),
        //     require('../dom/FixFloatAlignment'),
        //     require('../dom/FixFontColor'),
        //     require('../dom/FixMsoWrapper'),
        //     require('../dom/FixResponsiveImages'),
        //     require('../dom/FixTableAlignment'),
        //     require('../dom/RemoveDisplayNone'),
        //     require('../dom/RemoveScriptTags'),
        // ], options.dom),
        // require('../plugins/HtmlMinifier'),
        // require('../plugins/DecodeHrefAmpersands')
    ]);

    return await runner.process(src);
};