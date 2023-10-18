import ManipulateDom from './ManipulateDom';
import FixBackgroundColor from './dom/FixBackgroundColor';
import FixFloatAlignment from './dom/FixFloatAlignment';
import FixFontColor from './dom/FixFontColor';
import FixHrefQueryStrings from './dom/FixHrefQueryStrings';
import FixMsoWrapper from './dom/FixMsoWrapper';
import FixResponsiveImages, { FixResponsiveImagesOptions } from './dom/FixResponsiveImages';
import FixTableAlignment from './dom/FixTableAlignment';
import RemoveDisplayNone from './dom/RemoveDisplayNone';
import RemoveScriptTags from './dom/RemoveScriptTags';
import { default as ReplaceQueryString, ReplaceQueryStringOptions } from './dom/ReplaceQueryStrings';
import { run } from './helpers';
import DecodeHrefAmpersands from './plugins/DecodeHrefAmpersands';
import ExtractTarget, { ExtractTargetOptions } from './plugins/ExtractTarget';
import HtmlMinifier, { HtmlMinifierOptions } from './plugins/HtmlMinifier';
import InlineCss, { InlineCssOptions } from './plugins/InlineCss';
import PreserveBodyAttributes from './plugins/PreserveBodyAttributes';
import PreserveHeadTag from './plugins/PreserveHeadTag';
import Template, { TemplateOptions } from './plugins/Template';

export type CapsulateOptions = {
    extractTarget?: ExtractTargetOptions,
    htmlMinifier?: HtmlMinifierOptions,
    inlineCss?: InlineCssOptions,
    template?: TemplateOptions,
    dom?: {
        fixResponsiveImages?: FixResponsiveImagesOptions,
        replaceQueryStrings?: ReplaceQueryStringOptions
    }
}

export async function capsulate(src: string, options: CapsulateOptions = {}) {
    return await run(src, [
        new ExtractTarget(options.extractTarget),
        new HtmlMinifier(options.htmlMinifier),
        new InlineCss(options.inlineCss),
        new Template(options.template),
        new ManipulateDom([
            new FixHrefQueryStrings,
            new FixBackgroundColor,
            new FixFloatAlignment,
            new FixFontColor,
            new FixMsoWrapper,
            new FixResponsiveImages(options.dom?.fixResponsiveImages),
            new FixTableAlignment,
            new RemoveDisplayNone,
            new RemoveScriptTags,
            new ReplaceQueryString(options.dom?.replaceQueryStrings)
        ]),
        new PreserveBodyAttributes,
        new PreserveHeadTag,
        new DecodeHrefAmpersands,
    ]);
};