import { ManipulateDom } from './ManipulateDom';
import { DecodeEntitiesInStyleAttributes } from './dom/DecodeEntitiesInStyleAttributes';
import { FixBackgroundColor } from './dom/FixBackgroundColor';
import { FixFontColor } from './dom/FixFontColor';
import { FixHrefQueryStrings } from './dom/FixHrefQueryStrings';
import { FixMsoWrapper } from './dom/FixMsoWrapper';
import { FixResponsiveImages, type FixResponsiveImagesOptions } from './dom/FixResponsiveImages';
import { FixTableAlignment } from './dom/FixTableAlignment';
import { RemoveDisplayNone } from './dom/RemoveDisplayNone';
import { RemoveScriptTags } from './dom/RemoveScriptTags';
import { ReplaceNonAsciiCharsWithEntities } from './dom/ReplaceNonAsciiCharsWithEntities';
import { ReplaceQueryStrings, type ReplaceQueryStringOptions } from './dom/ReplaceQueryStrings';
import { run } from './helpers';
import { Courier, type CourierOptions } from './plugins/Courier';
import { DecodeHrefAmpersands } from './plugins/DecodeHrefAmpersands';
import { ExtractTarget, type ExtractTargetOptions } from './plugins/ExtractTarget';
import { HtmlMinifier, type HtmlMinifierOptions } from './plugins/HtmlMinifier';
import { InlineCss, type InlineCssOptions } from './plugins/InlineCss';
import { PreserveBodyAttributes } from './plugins/PreserveBodyAttributes';
import { PreserveHeadTag } from './plugins/PreserveHeadTag';
import { PreviewText, type PreviewTextOptions } from './plugins/PreviewText';
import { ReplaceSourceCode, type ReplaceSourceCodeOptions } from './plugins/ReplaceSourceCode';
import { Template, type TemplateOptions } from './plugins/Template';

export type CapsulateOptions = {
    dom?: {
        fixResponsiveImages?: FixResponsiveImagesOptions;
        replaceQueryStrings?: ReplaceQueryStringOptions;
    }
    extractTarget?: ExtractTargetOptions;
    htmlMinifier?: HtmlMinifierOptions;
    inlineCss?: InlineCssOptions;
    previewText?: PreviewTextOptions;
    template?: TemplateOptions;
    replaceSourceCode?: ReplaceSourceCodeOptions;
    courier?: CourierOptions;
}

export async function capsulate(src: string, options: CapsulateOptions = {}) {
    return await run(src, [
        new ExtractTarget(options.extractTarget),
        new HtmlMinifier(options.htmlMinifier),
        new PreserveHeadTag,
        new Template(options.template),
        new ManipulateDom([
            new DecodeEntitiesInStyleAttributes,
            new FixHrefQueryStrings,
            new FixBackgroundColor,
            // @note - Removing this code for now, because it doesn't have
            // proper tests. If Mark or client reports more alignment issues,
            // we should re-examine this code and write new tests.
            // new FixFloatAlignment,
            new FixFontColor,
            new FixMsoWrapper,
            new FixResponsiveImages(options.dom?.fixResponsiveImages),
            new FixTableAlignment,
            new RemoveDisplayNone,
            new RemoveScriptTags,
            new ReplaceQueryStrings(options.dom?.replaceQueryStrings),
            new ReplaceNonAsciiCharsWithEntities,
        ]),
        new PreserveBodyAttributes,
        new PreviewText(options.previewText),
        new DecodeHrefAmpersands,
        new ReplaceSourceCode(options.replaceSourceCode),
        new Courier(options.courier),
        // Must go last to ensure all CSS is inlined
        new InlineCss(options.inlineCss),
    ]);
};