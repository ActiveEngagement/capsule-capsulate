import { type FixResponsiveImagesOptions } from './dom/FixResponsiveImages';
import { type ReplaceQueryStringOptions } from './dom/ReplaceQueryStrings';
import { type ExtractTargetOptions } from './plugins/ExtractTarget';
import { type HtmlMinifierOptions } from './plugins/HtmlMinifier';
import { type InlineCssOptions } from './plugins/InlineCss';
import { type PreviewTextOptions } from './plugins/PreviewText';
import { type TemplateOptions } from './plugins/Template';
export type CapsulateOptions = {
    dom?: {
        fixResponsiveImages?: FixResponsiveImagesOptions;
        replaceQueryStrings?: ReplaceQueryStringOptions;
    };
    extractTarget?: ExtractTargetOptions;
    htmlMinifier?: HtmlMinifierOptions;
    inlineCss?: InlineCssOptions;
    previewText?: PreviewTextOptions;
    template?: TemplateOptions;
};
export declare function capsulate(src: string, options?: CapsulateOptions): Promise<string>;
