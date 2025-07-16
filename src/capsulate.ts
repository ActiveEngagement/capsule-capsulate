import { defaultsDeep } from 'lodash-es';
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
import { Template, type TemplateOptions } from './plugins/Template';

export type MaybeOption<T = never> = Partial<T>|false|undefined;

export type CapsulateOptions = {
    extractTarget: MaybeOption<ExtractTargetOptions>;
    htmlMinifier: MaybeOption<HtmlMinifierOptions>;
    preserveHeadTag: MaybeOption;
    template: MaybeOption<TemplateOptions>;
    dom: Partial<{
        decodeEntitiesInStyleAttributes: MaybeOption;
        fixHrefQueryStrings: MaybeOption;
        fixBackgroundColor: MaybeOption;
        fixFontColor: MaybeOption;
        fixMsoWrapper: MaybeOption;
        fixResponsiveImages: MaybeOption<FixResponsiveImagesOptions>;
        fixTableAlignment: MaybeOption;
        removeDisplayNone: MaybeOption;
        removeScriptTags: MaybeOption;
        replaceQueryStrings: MaybeOption<ReplaceQueryStringOptions>;
        replaceNonAsciiChars: MaybeOption;
    }>;
    preserveBodyAttributes: MaybeOption;
    previewText: MaybeOption<PreviewTextOptions>;
    decodeHrefAmpersands: MaybeOption;
    courier: MaybeOption<CourierOptions>;
    inlineCss: MaybeOption<InlineCssOptions>;
}

export function defaultOptions(options?: Partial<CapsulateOptions>): CapsulateOptions {
    return defaultsDeep({
        extractTarget: undefined,
        htmlMinifier: undefined,
        preserveHeadTag: undefined,
        template: undefined,
        dom: {
            decodeEntitiesInStyleAttributes: undefined,
            fixHrefQueryStrings: undefined,
            fixBackgroundColor: undefined,
            fixFontColor: undefined,
            fixMsoWrapper: undefined,
            fixResponsiveImages: undefined,
            fixTableAlignment: undefined,
            removeDisplayNone: undefined,
            removeScriptTags: undefined,
            replaceQueryStrings: undefined,
            replaceNonAsciiChars: undefined,
        },
        preserveBodyAttributes: undefined,
        previewText: undefined,
        decodeHrefAmpersands: undefined,
        courier: undefined,
        inlineCss: undefined,
    } as CapsulateOptions, options);
}

export function only(options: Partial<CapsulateOptions>): CapsulateOptions {
    const result: CapsulateOptions = {
        extractTarget: false,
        htmlMinifier: false,
        preserveHeadTag: false,
        template: false,
        dom: {
            decodeEntitiesInStyleAttributes: false,
            fixHrefQueryStrings: false,
            fixBackgroundColor: false,
            fixFontColor: false,
            fixMsoWrapper: false,
            fixResponsiveImages: false,
            fixTableAlignment: false,
            removeDisplayNone: false,
            removeScriptTags: false,
            replaceQueryStrings: false,
            replaceNonAsciiChars: false,
        },
        preserveBodyAttributes: false,
        previewText: false,
        decodeHrefAmpersands: false,
        courier: false,
        inlineCss: false,
    };

    Object.keys(options).forEach(key => {
        const k = key as keyof CapsulateOptions;
        
        if(k === 'dom' && options[k]) {
            result[k] = { ...result[k], ...options[k] };
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (result as any)[k] = options[k];
        }
    });

    return result;
}

export async function capsulate(src: string, opts?: Partial<CapsulateOptions> | (() => Partial<CapsulateOptions>)) {
    const options = typeof opts === 'function'
        ? only(opts())
        : defaultOptions(opts);

    return await run(src, [
        new ExtractTarget(options.extractTarget),
        new HtmlMinifier(options.htmlMinifier),
        new PreserveHeadTag(options.preserveHeadTag),
        new Template(options.template),
        new ManipulateDom([
            new DecodeEntitiesInStyleAttributes(options.dom?.decodeEntitiesInStyleAttributes),
            new FixHrefQueryStrings(options.dom?.fixHrefQueryStrings),
            new FixBackgroundColor(options.dom?.fixBackgroundColor),
            new FixFontColor(options.dom?.fixFontColor),
            new FixMsoWrapper(options.dom?.fixMsoWrapper),
            new FixResponsiveImages(options.dom?.fixResponsiveImages),
            new FixTableAlignment(options.dom?.fixTableAlignment),
            new RemoveDisplayNone(options.dom?.removeDisplayNone),
            new RemoveScriptTags(options.dom?.removeScriptTags),
            new ReplaceQueryStrings(options.dom?.replaceQueryStrings),
            new ReplaceNonAsciiCharsWithEntities(options.dom?.replaceNonAsciiChars),
        ]),
        new PreserveBodyAttributes(options.preserveBodyAttributes),
        new PreviewText(options.previewText),
        new DecodeHrefAmpersands(options.decodeHrefAmpersands),
        new Courier(options.courier),
        // Must go last to ensure all CSS is inlined
        new InlineCss(options.inlineCss),
    ]);
};