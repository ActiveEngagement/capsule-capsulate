import { BasePlugin } from '../Plugin';
export type HtmlMinifierOptions = {
    lineLengthLimit: number;
    removeIndentations: boolean;
    removeLineBreaks: boolean;
    removeHTMLComments: boolean | 0 | 1 | 2;
    removeCSSComments: boolean;
    reportProgressFunc: null | ((percDone: number) => void);
    reportProgressFuncFrom: number;
    reportProgressFuncTo: number;
    breakToTheLeftOf: string[];
    mindTheInlineTags: string[];
};
export class HtmlMinifier extends BasePlugin<Partial<HtmlMinifierOptions>> {
    defaultOptions(): Partial<HtmlMinifierOptions>;
    transform(src: string): Promise<string>;
}
