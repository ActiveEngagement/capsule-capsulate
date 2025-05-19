import { useReplaceQueryStrings } from '../helpers';
import { BasePlugin } from '../Plugin';

export type ReplaceSourceCodeOptions = {
    sourceCode?: string;
}

export class ReplaceSourceCode extends BasePlugin<ReplaceSourceCodeOptions> {

    defaultOptions(): ReplaceSourceCodeOptions {
        return {
            sourceCode: undefined
        };
    }

    async transform(src: string) {
        if(!this.options.sourceCode) {
            return src;
        }

        const { sourceCodes, replace } = useReplaceQueryStrings(src);

        for(const [, codes] of sourceCodes.value) {
            for(const [, code] of codes.entries()) {
                if(code.from.match(/^xxxxx+$/gmi)) {
                    code.to = this.options.sourceCode;
                }
                // else if(this.options.sourceCode.match(new RegExp(code.from))) {
                //     code.to = this.options.sourceCode;
                // }
            }
        }

        return await replace();
    }
};