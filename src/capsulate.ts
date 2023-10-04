import ManipulateDom from './ManipulateDom';
import TaskRunner from './TaskRunner';
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
import DecodeHrefAmpersands from './plugins/DecodeHrefAmpersands';
import ExtractTarget, { ExtractTargetOptions } from './plugins/ExtractTarget';
import HtmlMinifier, { HtmlMinifierOptions } from './plugins/HtmlMinifier';
import InlineCss from './plugins/InlineCss';
import PreserveBodyAttributes from './plugins/PreserveBodyAttributes';
import PreserveHeadTag from './plugins/PreserveHeadTag';
import Template, { TemplateOptions } from './plugins/Template';

export type CapsulateOptions = {
    extractTarget?: ExtractTargetOptions,
    htmlMinifier?: HtmlMinifierOptions,
    template?: TemplateOptions,
    dom?: {
        fixResponsiveImages?: FixResponsiveImagesOptions,
        replaceQueryStrings?: ReplaceQueryStringOptions
    }
}

export async function capsulate(src: string, options: CapsulateOptions = {}) {
    const runner = new TaskRunner([
        new PreserveBodyAttributes,
        new PreserveHeadTag,
        new ExtractTarget(options.extractTarget),
        new Template(options.template),
        new InlineCss(),
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
        new DecodeHrefAmpersands,
        new HtmlMinifier(options.htmlMinifier),
    ]);

    return await runner.process(src);
};

export async function capsulate2(src: string, options: CapsulateOptions = {}) {
    const runner = new TaskRunner([
        new PreserveBodyAttributes,
        new PreserveHeadTag,
        new ExtractTarget(options.extractTarget),
        new Template(options.template),
        new InlineCss(),
        new ManipulateDom([
            new FixBackgroundColor,
            new FixFloatAlignment,
            new FixFontColor,
            new FixMsoWrapper,
            new FixResponsiveImages(options.dom?.fixResponsiveImages),
            new FixTableAlignment,
            new RemoveDisplayNone,
            new RemoveScriptTags
        ]),
        new DecodeHrefAmpersands,
        new HtmlMinifier(options.htmlMinifier),
    ]);

    return await runner.process(src);
};