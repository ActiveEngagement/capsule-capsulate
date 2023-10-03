import { crush } from 'html-crush';
import BasePlugin from '../Plugin';

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

export default class HtmlMinifier extends BasePlugin<Partial<HtmlMinifierOptions>> {

    defaultOptions(): Partial<HtmlMinifierOptions> {
        // More options can be found here:
        // https://www.npmjs.com/package/html-crush
        return {
            lineLengthLimit: Infinity,
            removeIndentations: true,
            removeLineBreaks: true,
            removeHTMLComments: false,
            breakToTheLeftOf: []
        };
    }

    async transform(src: string) {
        return crush(src, this.options).result;
    }

};